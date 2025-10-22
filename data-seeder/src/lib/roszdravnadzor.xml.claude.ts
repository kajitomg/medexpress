import axios from "axios"
import sax from "sax"
import slugify from "slugify"
import unzipper from "unzipper"

// ============= ТИПЫ =============
interface Section {
  code?: string
  name?: string
  parent_code?: string
}

interface Classificator {
  code?: string
  name?: string
  description?: string
  sections: Section[]
}

interface DbSection {
  documentId: string
  code: string
  name: string
  sort_code: string
  slug: string
}

interface DbClassificator {
  documentId: string
  code: string
  name: string
  slug: string
}

interface DeleteStats {
  typesDeleted: number
  typesFailed: number
  sectionsDeleted: number
  sectionsFailed: number
  errors: any[]
}

// ============= CONFIGURATION =============
const BATCH_CONFIG = {
  SECTIONS_CREATE_BATCH: 30,
  SECTIONS_CREATE_PARALLEL_UPDATE: 10, // Обновление родителей параллельно
  
  TYPES_CREATE_BATCH: 30,
  
  DELETE_PAGE_SIZE: 100,      // Сколько запрашивать за раз
  DELETE_TYPES_BATCH: 50,     // Удаление типов параллельно
  DELETE_SECTIONS_BATCH: 30,  // Удаление секций (осторожнее из-за связей)
  
  // Задержки (мс)
  DELAY_BETWEEN_BATCHES: 100,
  DELAY_BETWEEN_ITERATIONS: 200,
  DELAY_BETWEEN_TYPE_BATCHES: 200,
}

// ============= UTILS =============
const toSortCode = (code: string): string => {
  return code.split(".").map(part => part.padStart(4, "0")).join(".")
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Проверяет валидность кода секции
 */
const isValidSectionCode = (code: string): boolean => {
  if (!code) return false
  
  const parts = code.split(".")
  
  // Проверяем корневой уровень (первую часть) - должен быть от 1 до 20
  const rootPart = parts[0]
  const rootNum = parseInt(rootPart, 10)
  
  if (isNaN(rootNum) || rootNum < 1 || rootNum > 20) {
    return false
  }
  
  // Остальные части (вложенные) могут быть любыми положительными числами
  for (let i = 1; i < parts.length; i++) {
    const num = parseInt(parts[i], 10)
    
    // Проверяем только что это число и оно >= 1
    if (isNaN(num) || num < 1) {
      return false
    }
  }
  
  return true
}

/**
 * Нормализует имя (убирает лишние пробелы и переносы)
 */
const normalizeName = (name: string): string => {
  return name.replace(/\s+/g, " ").trim()
}

/**
 * Генерирует базовый slug из имени
 */
const generateBaseSlug = (name: string): string => {
  return slugify(name, { lower: true, strict: true, locale: "ru" })
}

// ============= SLUG MANAGER =============
class SlugManager {
  private usedSlugs = new Set<string>()
  
  /**
   * Инициализирует менеджер существующими slug из БД
   */
  initialize(sections: DbSection[], types: DbClassificator[]) {
    sections.forEach(s => this.usedSlugs.add(s.slug))
    types.forEach(t => this.usedSlugs.add(t.slug))
  }
  
  /**
   * Генерирует уникальный slug для секции
   * Стратегия: базовый slug + код секции
   */
  generateSectionSlug(name: string, code: string): string {
    const baseSlug = generateBaseSlug(name)
    
    // Для секций всегда добавляем код для гарантии уникальности
    const slugWithCode = `${baseSlug}-${code.replace(/\./g, "-")}`
    
    let finalSlug = slugWithCode
    let counter = 2
    
    while (this.usedSlugs.has(finalSlug)) {
      finalSlug = `${slugWithCode}-${counter}`
      counter++
    }
    
    this.usedSlugs.add(finalSlug)
    return finalSlug
  }
  
  /**
   * Генерирует уникальный slug для типа
   * Стратегия: базовый slug, при коллизии добавляем код
   */
  generateTypeSlug(name: string, code: string): string {
    const baseSlug = generateBaseSlug(name)
    
    if (!this.usedSlugs.has(baseSlug)) {
      this.usedSlugs.add(baseSlug)
      return baseSlug
    }
    
    const slugWithCode = `${baseSlug}-${code}`
    
    if (!this.usedSlugs.has(slugWithCode)) {
      this.usedSlugs.add(slugWithCode)
      return slugWithCode
    }
    
    let finalSlug = slugWithCode
    let counter = 2
    
    while (this.usedSlugs.has(finalSlug)) {
      finalSlug = `${slugWithCode}-${counter}`
      counter++
    }
    
    this.usedSlugs.add(finalSlug)
    return finalSlug
  }
  
  /**
   * Освобождает slug (на случай отката транзакции)
   */
  releaseSlug(slug: string) {
    this.usedSlugs.delete(slug)
  }
  
  /**
   * Получает количество зарегистрированных slug
   */
  getCount(): number {
    return this.usedSlugs.size
  }
}

// ============= LOGGER =============
class Logger {
  private prefix: string
  
  constructor(context: string) {
    this.prefix = `[${context}]`
  }
  
  private timestamp() {
    return new Date().toISOString().substring(11, 19)
  }
  
  info(message: string) {
    console.log(`${this.timestamp()} ${this.prefix} ℹ️  ${message}`)
  }
  
  success(message: string) {
    console.log(`${this.timestamp()} ${this.prefix} ✅ ${message}`)
  }
  
  error(message: string, error?: any) {
    console.error(`${this.timestamp()} ${this.prefix} ❌ ${message}`, error || "")
  }
  
  warn(message: string) {
    console.warn(`${this.timestamp()} ${this.prefix} ⚠️  ${message}`)
  }
  
  progress(current: number, total: number, message: string) {
    const safeCurrent = Math.max(0, Math.min(current, total))
    const percent = total > 0 ? Math.round((safeCurrent / total) * 100) : 0
    const bar = this.getBar(percent)
    console.log(`${this.timestamp()} ${this.prefix} ${bar} ${safeCurrent}/${total} (${percent}%) ${message}`)
  }
  
  divider(char: string = "=", length: number = 80) {
    console.log(char.repeat(length))
  }
  
  private getBar(percent: number): string {
    const safePercent = Math.max(0, Math.min(100, percent))
    const filled = Math.floor(safePercent / 5)
    const empty = 20 - filled
    
    const safeFilled = Math.max(0, Math.min(20, filled))
    const safeEmpty = Math.max(0, Math.min(20, empty))
    
    return `[${"█".repeat(safeFilled)}${"░".repeat(safeEmpty)}]`
  }
}

// ============= XML PARSER =============
class XmlParser {
  private logger: Logger
  private currentItem: Classificator | null = null
  private currentTag: string | null = null
  private tagStack: string[] = []
  private rawResult: Classificator[] = [] // Сырые данные с дубликатами
  private insideSections = false
  private invalidSectionsCount = 0
  
  constructor() {
    this.logger = new Logger("Parser")
  }
  
  createStream() {
    const saxStream = sax.createStream(true)
    
    saxStream.on("opentag", (node) => this.handleOpenTag(node))
    saxStream.on("text", (text) => this.handleText(text))
    saxStream.on("closetag", (tagName) => this.handleCloseTag(tagName))
    saxStream.on("end", () => {
      this.logger.success(`Парсинг завершен: ${this.rawResult.length} записей`)
      if (this.invalidSectionsCount > 0) {
        this.logger.warn(`Отфильтровано невалидных секций: ${this.invalidSectionsCount}`)
      }
    })
    saxStream.on("error", (error) => this.logger.error("Ошибка парсинга", error))
    
    return saxStream
  }
  
  private handleOpenTag(node: any) {
    const tagName = node.name
    this.tagStack.push(tagName)
    this.currentTag = tagName
    
    if (tagName === "classificator") {
      this.currentItem = { sections: [] }
    } else if (tagName === "sections") {
      this.insideSections = true
    } else if (tagName === "section" && this.currentItem && this.insideSections) {
      this.currentItem.sections.push({})
    }
  }
  
  private handleText(text: string) {
    const trimmedText = text.trim()
    if (!trimmedText || !this.currentTag || !this.currentItem) return
    
    const parentTag = this.tagStack[this.tagStack.length - 2]
    
    if (parentTag === "classificator") {
      switch (this.currentTag) {
        case "code":
          this.currentItem.code = trimmedText
          break
        case "name":
          this.currentItem.name = normalizeName(trimmedText)
          break
        case "description":
          this.currentItem.description = normalizeName(trimmedText)
          break
      }
    }
    
    if (parentTag === "section" && this.currentItem.sections.length > 0) {
      const currentSection = this.currentItem.sections[this.currentItem.sections.length - 1]
      
      switch (this.currentTag) {
        case "section_number":
          currentSection.code = trimmedText
          break
        case "section_name":
          currentSection.name = normalizeName(trimmedText)
          break
        case "parent_number":
          currentSection.parent_code = trimmedText || undefined
          break
      }
    }
  }
  
  private handleCloseTag(tagName: string) {
    if (tagName === "sections") {
      this.insideSections = false
    }
    
    if (tagName === "classificator" && this.currentItem) {
      const originalLength = this.currentItem.sections.length
      this.currentItem.sections = this.currentItem.sections.filter(s => {
        if (!s.code || !s.name) return false
        if (!isValidSectionCode(s.code)) {
          this.invalidSectionsCount++
          return false
        }
        return true
      })
      
      if (this.currentItem.sections.length < originalLength) {
        this.logger.warn(
          `Классификатор [${this.currentItem.code}]: отфильтровано ${originalLength - this.currentItem.sections.length} невалидных секций`,
        )
      }
      
      if (this.rawResult.length > 0 && this.rawResult.length % 500 === 0) {
        this.logger.info(`Распарсено: ${this.rawResult.length}`)
      }
      
      this.rawResult.push(this.currentItem)
      this.currentItem = null
    }
    
    this.tagStack.pop()
    this.currentTag = null
  }
  
  /**
   * Объединяет дубликаты классификаторов (один код может встречаться несколько раз)
   */
  private mergeClassificators(raw: Classificator[]): Classificator[] {
    const merged = new Map<string, Classificator>()
    
    for (const item of raw) {
      if (!item.code) continue
      
      const existing = merged.get(item.code)
      
      if (existing) {
        const existingSectionCodes = new Set(existing.sections.map(s => s.code))
        
        for (const section of item.sections) {
          if (section.code && !existingSectionCodes.has(section.code)) {
            existing.sections.push(section)
            existingSectionCodes.add(section.code)
          }
        }
      } else {
        merged.set(item.code, {
          code: item.code,
          name: item.name,
          description: item.description,
          sections: [...item.sections],
        })
      }
    }
    
    return Array.from(merged.values())
  }
  
  /**
   * Возвращает объединенный результат (без дубликатов)
   */
  getResult(): Classificator[] {
    this.logger.info("Объединение дубликатов классификаторов...")
    
    const merged = this.mergeClassificators(this.rawResult)
    
    // Подсчитываем статистику
    const duplicatesCount = this.rawResult.length - merged.length
    
    if (duplicatesCount > 0) {
      this.logger.info(`Объединено дубликатов: ${duplicatesCount}`)
      this.logger.info(`Уникальных классификаторов: ${merged.length}`)
    }
    
    this.logger.success(`Итого классификаторов: ${merged.length}`)
    
    return merged
  }
  
  getInvalidSectionsCount(): number {
    return this.invalidSectionsCount
  }
}

// ============= DATA PROCESSOR =============
class DataProcessor {
  private logger: Logger
  private api: any
  private slugManager: SlugManager
  
  private memSections: Map<string, DbSection> = new Map()
  private memTypes: Map<string, DbClassificator> = new Map()
  
  private stats = {
    sectionsCreated: 0,
    sectionsUpdated: 0,
    sectionsExisted: 0,
    sectionsSkipped: 0,
    slugCollisions: 0,
    typesCreated: 0,
    typesUpdated: 0,
    typesExisted: 0,
    typesSkipped: 0,
    typesMissingSections: 0,
    errors: [] as any[],
  }
  
  constructor(api: any) {
    this.api = api
    this.logger = new Logger("Processor")
    this.slugManager = new SlugManager()
  }
  
  async initialize() {
    this.logger.info("Загрузка данных из БД...")
    
    const [sectionsRes, typesRes] = await Promise.all([
      this.api.get("api/device-sections"),
      this.api.get("api/device-types"),
    ])
    
    const sections = sectionsRes.data.data || []
    const types = typesRes.data.data || []
    
    sections.forEach(s => this.memSections.set(s.code, s))
    types.forEach(t => this.memTypes.set(t.code, t))
    
    // Инициализируем менеджер slug
    this.slugManager.initialize(sections, types)
    
    this.logger.success(`Загружено: секций ${sections.length}, типов ${types.length}`)
    this.logger.info(`Зарегистрировано slug: ${this.slugManager.getCount()}`)
  }
  
  async processAll(classificators: Classificator[]) {
    const startTime = Date.now()
    
    this.logger.info(`\n${"=".repeat(80)}`)
    this.logger.info(`ОБРАБОТКА: ${classificators.length} классификаторов`)
    this.logger.info(`${"=".repeat(80)}\n`)
    
    // ===== ШАГ 1: Собираем все уникальные секции из XML =====
    const allSectionsMap = new Map<string, Section>()
    
    for (const classificator of classificators) {
      for (const section of classificator.sections) {
        if (!section.code || !section.name) continue
        
        if (!allSectionsMap.has(section.code)) {
          allSectionsMap.set(section.code, section)
        }
      }
    }
    
    this.logger.info(`Уникальных секций из XML: ${allSectionsMap.size}`)
    
    // ===== ШАГ 2: Обрабатываем секции =====
    await this.processSections(Array.from(allSectionsMap.values()))
    
    // ===== ШАГ 3: Обрабатываем типы =====
    await this.processTypes(classificators)
    
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
    
    this.logger.info(`\n${"=".repeat(80)}`)
    this.logger.success(`ЗАВЕРШЕНО за ${elapsed}с`)
    this.logger.info(`${"=".repeat(80)}`)
    this.printStats()
    
    return this.stats
  }
  
  private async processSections(sections: Section[]) {
    this.logger.info("\n--- ОБРАБОТКА СЕКЦИЙ ---")
    
    // Сортируем по уровню вложенности
    const sorted = sections.sort((a, b) => {
      const aLevel = (a.code?.match(/\./g) || []).length
      const bLevel = (b.code?.match(/\./g) || []).length
      return aLevel - bLevel
    })
    
    const total = sorted.length
    let processed = 0
    
    for (let i = 0; i < total; i += BATCH_CONFIG.SECTIONS_CREATE_BATCH) {
      const batch = sorted.slice(i, i + BATCH_CONFIG.SECTIONS_CREATE_BATCH)
      
      await this.processSectionsBatch(batch)
      
      processed += batch.length
      this.logger.progress(processed, total, "секций обработано")
      
      if (i + BATCH_CONFIG.SECTIONS_CREATE_BATCH < total) {
        await sleep(BATCH_CONFIG.DELAY_BETWEEN_BATCHES)
      }
    }
    
    this.logger.success(`Секций обработано: ${total}`)
  }
  
  private async processSectionsBatch(sections: Section[]) {
    const toCreate: Section[] = []
    const toUpdate: Array<{ section: DbSection, parentId: string }> = []
    
    for (const section of sections) {
      const existing = this.memSections.get(section.code!)
      
      if (existing) {
        this.stats.sectionsExisted++
        
        if (section.parent_code) {
          const parent = this.memSections.get(section.parent_code)
          if (parent) {
            toUpdate.push({ section: existing, parentId: parent.documentId })
          }
        }
      } else {
        toCreate.push(section)
      }
    }
    
    // Создаем последовательно
    for (const section of toCreate) {
      await this.createSection(section)
    }
    
    // Обновляем параллельно
    if (toUpdate.length > 0) {
      for (let i = 0; i < toUpdate.length; i += BATCH_CONFIG.SECTIONS_CREATE_PARALLEL_UPDATE) {
        const chunk = toUpdate.slice(i, i + BATCH_CONFIG.SECTIONS_CREATE_PARALLEL_UPDATE)
        await Promise.allSettled(
          chunk.map(({ section, parentId }) =>
            this.updateSectionParent(section.documentId, parentId),
          ),
        )
      }
    }
  }
  
  private async createSection(section: Section): Promise<DbSection | null> {
    const slug = this.slugManager.generateSectionSlug(section.name!, section.code!)
    
    try {
      const sortCode = toSortCode(section.code!)
      
      const data: any = {
        slug,
        code: section.code,
        sort_code: sortCode,
        name: section.name,
      }
      
      if (section.parent_code) {
        const parent = this.memSections.get(section.parent_code)
        if (parent) {
          data.parent = { connect: [parent.documentId] }
        }
      }
      
      const response = await this.api.post("api/device-sections", { data })
      const created = response.data.data
      
      this.memSections.set(created.code, created)
      this.stats.sectionsCreated++
      
      return created
    } catch (error) {
      // Откатываем slug при ошибке
      this.slugManager.releaseSlug(slug)
      
      const errorMsg = error?.response?.data?.error?.message || error.message
      
      // Проверяем, не ошибка ли уникальности slug
      if (errorMsg.includes("slug") || errorMsg.includes("unique")) {
        this.stats.slugCollisions++
        this.logger.error(
          `Коллизия slug для секции [${section.code}]: "${slug}"`,
          errorMsg,
        )
      } else {
        this.logger.error(
          `Ошибка создания секции [${section.code}] ${section.name}`,
          errorMsg,
        )
      }
      
      this.stats.errors.push({
        type: "section_create",
        code: section.code,
        name: section.name,
        slug,
        error: errorMsg,
      })
      this.stats.sectionsSkipped++
      return null
    }
  }
  
  private async updateSectionParent(sectionId: string, parentId: string): Promise<boolean> {
    try {
      await this.api.put(`api/device-sections/${sectionId}`, {
        data: { parent: { connect: [parentId] } },
      })
      this.stats.sectionsUpdated++
      return true
    } catch (error) {
      this.stats.errors.push({
        type: "section_update",
        sectionId,
        error: error?.response?.data?.error?.message || error.message,
      })
      return false
    }
  }
  
  private async processTypes(classificators: Classificator[]) {
    this.logger.info("\n--- ОБРАБОТКА ТИПОВ ---")
    
    const validTypes = classificators.filter(c =>
      c.code && c.name && c.description,
    )
    
    const total = validTypes.length
    let processed = 0
    
    for (let i = 0; i < total; i += BATCH_CONFIG.TYPES_CREATE_BATCH) {
      const batch = validTypes.slice(i, i + BATCH_CONFIG.TYPES_CREATE_BATCH)
      
      await Promise.allSettled(
        batch.map(type => this.processType(type)),
      )
      
      processed += batch.length
      this.logger.progress(processed, total, "типов обработано")
      
      if (i + BATCH_CONFIG.TYPES_CREATE_BATCH < total) {
        await sleep(BATCH_CONFIG.DELAY_BETWEEN_TYPE_BATCHES)
      }
    }
    
    this.logger.success(`Типов обработано: ${total}`)
  }
  
  private async processType(classificator: Classificator) {
    const slug = this.slugManager.generateTypeSlug(classificator.name!, classificator.code!)
    
    try {
      if (classificator.sections.length === 0) {
        this.stats.typesSkipped++
        return
      }
      
      const sectionIds: string[] = []
      const missingSections: string[] = []
      
      for (const section of classificator.sections) {
        if (!section.code) continue
        
        const dbSection = this.memSections.get(section.code)
        if (dbSection) {
          sectionIds.push(dbSection.documentId)
        } else {
          missingSections.push(section.code)
        }
      }
      
      if (missingSections.length > 0) {
        this.logger.warn(
          `Тип [${classificator.code}]: не найдены секции: ${missingSections.join(", ")}`,
        )
        this.stats.typesMissingSections++
      }
      
      if (sectionIds.length === 0) {
        this.logger.warn(`Тип [${classificator.code}]: нет валидных секций, пропущен`)
        this.slugManager.releaseSlug(slug)
        this.stats.typesSkipped++
        return
      }
      
      const existing = this.memTypes.get(classificator.code!)
      
      if (existing) {
        // Обновляем (заменяем секции полностью)
        this.slugManager.releaseSlug(slug) // Освобождаем, так как не используем
        
        await this.api.put(`api/device-types/${existing.documentId}`, {
          data: {
            name: classificator.name,
            description: classificator.description,
            sections: { set: sectionIds }, // Используем "set" для полной замены
          },
        })
        this.stats.typesUpdated++
        this.stats.typesExisted++
      } else {
        // Создаем
        const response = await this.api.post("api/device-types", {
          data: {
            slug,
            code: classificator.code,
            name: classificator.name,
            description: classificator.description,
            sections: { connect: sectionIds },
          },
        })
        
        this.memTypes.set(classificator.code!, response.data.data)
        this.stats.typesCreated++
      }
    } catch (error) {
      this.slugManager.releaseSlug(slug)
      
      const errorMsg = error?.response?.data?.error?.message || error.message
      
      if (errorMsg.includes("slug") || errorMsg.includes("unique")) {
        this.stats.slugCollisions++
        this.logger.error(
          `Коллизия slug для типа [${classificator.code}]: "${slug}"`,
          errorMsg,
        )
      } else {
        this.logger.error(
          `Ошибка обработки типа [${classificator.code}]`,
          errorMsg,
        )
      }
      
      this.stats.errors.push({
        type: "type_process",
        code: classificator.code,
        name: classificator.name,
        slug,
        error: errorMsg,
      })
      this.stats.typesSkipped++
    }
  }
  
  private printStats() {
    console.log("\n📊 СТАТИСТИКА:\n")
    console.log("📁 СЕКЦИИ:")
    console.log(`  ✅ Создано:       ${this.stats.sectionsCreated}`)
    console.log(`  🔄 Обновлено:     ${this.stats.sectionsUpdated}`)
    console.log(`  ♻️  Существовало: ${this.stats.sectionsExisted}`)
    console.log(`  ⏭️  Пропущено:    ${this.stats.sectionsSkipped}`)
    console.log(`  📊 Всего в кэше:  ${this.memSections.size}`)
    
    console.log("\n📦 ТИПЫ:")
    console.log(`  ✅ Создано:       ${this.stats.typesCreated}`)
    console.log(`  🔄 Обновлено:     ${this.stats.typesUpdated}`)
    console.log(`  ♻️  Существовало: ${this.stats.typesExisted}`)
    console.log(`  ⏭️  Пропущено:    ${this.stats.typesSkipped}`)
    console.log(`  ⚠️  С отсутств. секциями: ${this.stats.typesMissingSections}`)
    console.log(`  📊 Всего в кэше:  ${this.memTypes.size}`)
    
    console.log(`\n🔗 SLUG:`)
    console.log(`  ⚠️  Коллизий:     ${this.stats.slugCollisions}`)
    console.log(`  📊 Всего slug:    ${this.slugManager.getCount()}`)
    
    console.log(`\n❌ Ошибок:        ${this.stats.errors.length}`)
    
    if (this.stats.errors.length > 0) {
      console.log("\nГруппировка ошибок:")
      const grouped = this.groupErrors(this.stats.errors)
      
      Object.entries(grouped)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .forEach(([key, count]) => {
          console.log(`  ${count}x ${key}`)
        })
      
      // Показываем примеры slug коллизий
      const slugErrors = this.stats.errors.filter(e =>
        e.error?.includes("slug") || e.error?.includes("unique"),
      )
      
      if (slugErrors.length > 0) {
        console.log("\nПримеры slug коллизий:")
        slugErrors.slice(0, 5).forEach(err => {
          console.log(`  [${err.code}] "${err.name}" -> "${err.slug}"`)
        })
      }
    }
    
    console.log("")
  }
  
  private groupErrors(errors: any[]): Record<string, number> {
    const grouped: Record<string, number> = {}
    
    errors.forEach(err => {
      const key = `${err.type}: ${err.error || "unknown"}`
      grouped[key] = (grouped[key] || 0) + 1
    })
    
    return grouped
  }
  
  getResult() {
    return {
      stats: this.stats,
      sectionsCount: this.memSections.size,
      typesCount: this.memTypes.size,
    }
  }
}

// ============= DELETE FUNCTIONALITY =============

/**
 * Удаляет все типы устройств из БД (с пагинацией)
 */
async function deleteAllTypes(api: any, logger: Logger): Promise<{ deleted: number, failed: number, errors: any[] }> {
  logger.info("Начало удаления типов устройств...")
  
  let totalDeleted = 0
  let totalFailed = 0
  const allErrors: any[] = []
  
  try {
    let hasMore = true
    let iteration = 0
    
    while (hasMore) {
      iteration++
      
      const response = await api.get("api/device-types", {
        params: {
          pagination: {
            page: 1,
            pageSize: BATCH_CONFIG.DELETE_PAGE_SIZE,
          },
        },
      })
      
      const types = response.data.data || []
      const total = response.data.meta?.pagination?.total || 0
      
      if (types.length === 0) {
        hasMore = false
        break
      }
      
      logger.info(`Итерация ${iteration}: найдено ${types.length} типов (всего осталось: ${total})`)
      
      // Удаляем батчами
      for (let i = 0; i < types.length; i += BATCH_CONFIG.DELETE_TYPES_BATCH) {
        const batch = types.slice(i, i + BATCH_CONFIG.DELETE_TYPES_BATCH)
        
        const results = await Promise.allSettled(
          batch.map(async (type) => {
            try {
              await api.delete(`api/device-types/${type.documentId}`)
              return { success: true, id: type.documentId }
            } catch (error) {
              return {
                success: false,
                id: type.documentId,
                code: type.code,
                error: error?.response?.data?.error?.message || error.message,
              }
            }
          }),
        )
        
        results.forEach((result) => {
          if (result.status === "fulfilled" && result.value.success) {
            totalDeleted++
          } else {
            totalFailed++
            if (result.status === "fulfilled") {
              allErrors.push(result.value)
            }
          }
        })
        
        logger.info(`  Удалено: ${totalDeleted}, ошибок: ${totalFailed}`)
        await sleep(BATCH_CONFIG.DELAY_BETWEEN_BATCHES)
      }
      
      await sleep(BATCH_CONFIG.DELAY_BETWEEN_ITERATIONS)
    }
    
    logger.success(`Удалено типов: ${totalDeleted}, ошибок: ${totalFailed}`)
    
    return { deleted: totalDeleted, failed: totalFailed, errors: allErrors }
    
  } catch (error) {
    logger.error("Ошибка при удалении типов", error)
    throw error
  }
}

/**
 * Удаляет все секции из БД (с пагинацией, от дочерних к родительским)
 */
async function deleteAllSections(api: any, logger: Logger): Promise<{
  deleted: number,
  failed: number,
  errors: any[]
}> {
  logger.info("Начало удаления секций...")
  
  let totalDeleted = 0
  let totalFailed = 0
  const allErrors: any[] = []
  
  const MAX_ITERATIONS = 50
  
  try {
    let hasMore = true
    let iteration = 0
    
    while (hasMore && iteration < MAX_ITERATIONS) {
      iteration++
      
      const response = await api.get("api/device-sections", {
        params: {
          pagination: {
            page: 1,
            pageSize: BATCH_CONFIG.DELETE_PAGE_SIZE,
          },
          sort: ["sort_code:desc"],
        },
      })
      
      const sections = response.data.data || []
      const total = response.data.meta?.pagination?.total || 0
      
      if (sections.length === 0) {
        hasMore = false
        break
      }
      
      logger.info(`Итерация ${iteration}: найдено ${sections.length} секций (всего осталось: ${total})`)
      
      // Сортируем: сначала самые глубокие
      const sorted = sections.sort((a, b) => {
        const aLevel = (a.code?.match(/\./g) || []).length
        const bLevel = (b.code?.match(/\./g) || []).length
        return bLevel - aLevel
      })
      
      // Удаляем батчами
      for (let i = 0; i < sorted.length; i += BATCH_CONFIG.DELETE_SECTIONS_BATCH) {
        const batch = sorted.slice(i, i + BATCH_CONFIG.DELETE_SECTIONS_BATCH)
        
        const results = await Promise.allSettled(
          batch.map(async (section) => {
            try {
              await api.delete(`api/device-sections/${section.documentId}`)
              return { success: true, id: section.documentId }
            } catch (error) {
              return {
                success: false,
                id: section.documentId,
                code: section.code,
                error: error?.response?.data?.error?.message || error.message,
              }
            }
          }),
        )
        
        results.forEach((result) => {
          if (result.status === "fulfilled" && result.value.success) {
            totalDeleted++
          } else {
            totalFailed++
            if (result.status === "fulfilled") {
              allErrors.push(result.value)
            }
          }
        })
        
        logger.info(`  Удалено: ${totalDeleted}, ошибок: ${totalFailed}`)
        await sleep(BATCH_CONFIG.DELAY_BETWEEN_BATCHES)
      }
      
      await sleep(BATCH_CONFIG.DELAY_BETWEEN_ITERATIONS)
    }
    
    if (iteration >= MAX_ITERATIONS) {
      logger.warn(`Достигнут лимит итераций (${MAX_ITERATIONS}), возможно остались секции`)
    }
    
    logger.success(`Удалено секций: ${totalDeleted}, ошибок: ${totalFailed}`)
    
    return { deleted: totalDeleted, failed: totalFailed, errors: allErrors }
    
  } catch (error) {
    logger.error("Ошибка при удалении секций", error)
    throw error
  }
}

/**
 * Удаляет все данные из БД (типы и секции)
 */
export async function deleteAllData(
  api: any,
  options: {
    deleteTypes?: boolean
    deleteSections?: boolean
    confirm?: boolean
  } = {},
): Promise<DeleteStats> {
  const {
    deleteTypes = true,
    deleteSections = true,
    confirm = false,
  } = options
  
  const logger = new Logger("Delete")
  
  logger.info(`\n${"=".repeat(80)}`)
  logger.info("🗑️  УДАЛЕНИЕ ДАННЫХ ИЗ БД")
  logger.info(`${"=".repeat(80)}`)
  
  if (!confirm) {
    logger.warn("⚠️  ВНИМАНИЕ! Для удаления данных установите { confirm: true }")
    logger.warn("⚠️  Это необратимая операция!")
    logger.info("\nПример использования:")
    logger.info("  await deleteAllData(api, { confirm: true })")
    return {
      typesDeleted: 0,
      typesFailed: 0,
      sectionsDeleted: 0,
      sectionsFailed: 0,
      errors: [],
    }
  }
  
  logger.warn("⚠️  ПОДТВЕРЖДЕНО УДАЛЕНИЕ ДАННЫХ")
  logger.info("Ожидайте завершения операции...\n")
  
  const stats: DeleteStats = {
    typesDeleted: 0,
    typesFailed: 0,
    sectionsDeleted: 0,
    sectionsFailed: 0,
    errors: [],
  }
  
  const startTime = Date.now()
  
  try {
    // ===== ШАГ 1: Удаляем типы =====
    if (deleteTypes) {
      logger.divider("─")
      logger.info("УДАЛЕНИЕ ТИПОВ УСТРОЙСТВ")
      logger.divider("─")
      
      const typesResult = await deleteAllTypes(api, logger)
      stats.typesDeleted = typesResult.deleted
      stats.typesFailed = typesResult.failed
      stats.errors.push(...typesResult.errors.map(e => ({ ...e, entity: "type" })))
    } else {
      logger.info("Удаление типов пропущено")
    }
    
    // ===== ШАГ 2: Удаляем секции =====
    if (deleteSections) {
      logger.divider("─")
      logger.info("УДАЛЕНИЕ СЕКЦИЙ")
      logger.divider("─")
      
      const sectionsResult = await deleteAllSections(api, logger)
      stats.sectionsDeleted = sectionsResult.deleted
      stats.sectionsFailed = sectionsResult.failed
      stats.errors.push(...sectionsResult.errors.map(e => ({ ...e, entity: "section" })))
    } else {
      logger.info("Удаление секций пропущено")
    }
    
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
    
    // ===== ИТОГИ =====
    logger.info(`\n${"=".repeat(80)}`)
    logger.success(`УДАЛЕНИЕ ЗАВЕРШЕНО за ${elapsed}с`)
    logger.info(`${"=".repeat(80)}`)
    
    console.log("\n📊 СТАТИСТИКА УДАЛЕНИЯ:\n")
    
    if (deleteTypes) {
      console.log("📦 ТИПЫ УСТРОЙСТВ:")
      console.log(`  ✅ Удалено:  ${stats.typesDeleted}`)
      console.log(`  ❌ Ошибки:   ${stats.typesFailed}`)
    }
    
    if (deleteSections) {
      console.log("\n📁 СЕКЦИИ:")
      console.log(`  ✅ Удалено:  ${stats.sectionsDeleted}`)
      console.log(`  ❌ Ошибки:   ${stats.sectionsFailed}`)
    }
    
    const totalErrors = stats.errors.length
    console.log(`\n❌ Всего ошибок: ${totalErrors}`)
    
    if (totalErrors > 0) {
      console.log("\nПервые 10 ошибок:")
      stats.errors.slice(0, 10).forEach((err, idx) => {
        console.log(`  ${idx + 1}. ${err.entity} [${err.code || err.id}]: ${err.error}`)
      })
      
      // Группировка ошибок
      const grouped = stats.errors.reduce((acc, err) => {
        const key = `${err.entity}: ${err.error}`
        acc[key] = (acc[key] || 0) + 1
        return acc
      }, {} as Record<string, number>)
      
      console.log("\nГруппировка ошибок:")
      Object.entries(grouped)
        //@ts-ignore
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .forEach(([key, count]) => {
          console.log(`  ${count}x ${key}`)
        })
    }
    
    console.log("")
    
    return stats
    
  } catch (error) {
    logger.error("💥 КРИТИЧЕСКАЯ ОШИБКА ПРИ УДАЛЕНИИ", error)
    throw error
  }
}

/**
 * Удаляет только типы устройств (секции остаются)
 */
export async function deleteOnlyTypes(api: any, confirm: boolean = false): Promise<DeleteStats> {
  return deleteAllData(api, {
    deleteTypes: true,
    deleteSections: false,
    confirm,
  })
}

/**
 * Удаляет только секции (типы остаются)
 */
export async function deleteOnlySections(api: any, confirm: boolean = false): Promise<DeleteStats> {
  return deleteAllData(api, {
    deleteTypes: false,
    deleteSections: true,
    confirm,
  })
}

/**
 * Проверяет количество записей в БД (без удаления)
 */
export async function checkDataCount(api: any): Promise<{ types: number, sections: number }> {
  const logger = new Logger("Check")
  
  logger.info("Проверка количества записей в БД...")
  
  try {
    const [typesRes, sectionsRes] = await Promise.all([
      api.get("api/device-types", {
        params: { pagination: { page: 1, pageSize: 1 } },
      }),
      api.get("api/device-sections", {
        params: { pagination: { page: 1, pageSize: 1 } },
      }),
    ])
    
    const typesCount = typesRes.data.meta?.pagination?.total || 0
    const sectionsCount = sectionsRes.data.meta?.pagination?.total || 0
    
    logger.info(`📦 Типов устройств: ${typesCount}`)
    logger.info(`📁 Секций: ${sectionsCount}`)
    
    return { types: typesCount, sections: sectionsCount }
    
  } catch (error) {
    logger.error("Ошибка проверки данных", error)
    throw error
  }
}

// ============= MAIN FUNCTION =============
export const processXmlStream = async (dataUrl: string, api: any) => {
  const logger = new Logger("Main")
  
  logger.info("🚀 ЗАПУСК ОБРАБОТКИ")
  logger.info(`📥 URL: ${dataUrl}`)
  
  try {
    const processor = new DataProcessor(api)
    await processor.initialize()
    
    const parser = new XmlParser()
    const saxStream = parser.createStream()
    
    logger.info("📥 Загрузка файла...")
    const response = await axios.get(dataUrl, { responseType: "stream" })
    
    logger.info("📦 Распаковка архива...")
    const unzipStream = unzipper.Parse({ forceStream: true })
    response.data.pipe(unzipStream)
    
    let xmlFound = false
    
    for await (const entry of unzipStream) {
      const { path: fileName, type } = entry
      
      if (type === "File" && fileName.endsWith(".xml")) {
        xmlFound = true
        logger.info(`📄 XML найден: ${fileName}`)
        logger.info("🔄 Парсинг...")
        
        await new Promise<void>((resolve, reject) => {
          saxStream.on("end", resolve)
          saxStream.on("error", reject)
          entry.pipe(saxStream)
        })
      } else {
        await entry.autodrain()
      }
    }
    
    if (!xmlFound) {
      logger.error("XML файл не найден")
      return { success: false, error: "XML файл не найден" }
    }
    
    const classificators = parser.getResult()
    
    if (classificators.length === 0) {
      logger.warn("Нет данных для обработки")
      return { success: false, error: "Нет данных" }
    }
    
    logger.info(`Невалидных секций отфильтровано: ${parser.getInvalidSectionsCount()}`)
    
    await processor.processAll(classificators)
    
    logger.success("🎉 ГОТОВО!")
    
    return {
      success: true,
      processedCount: classificators.length,
      invalidSectionsFiltered: parser.getInvalidSectionsCount(),
      ...processor.getResult(),
    }
    
  } catch (error) {
    logger.error("💥 КРИТИЧЕСКАЯ ОШИБКА", error)
    throw error
  }
}