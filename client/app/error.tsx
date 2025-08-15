"use client"

import { Button } from "@/shared/ui"

function Error({ reset }: { reset?: () => void }) {
  return (
    <div>
      <h2>Что-то пошло не так!</h2>
      <Button onClick={reset}>Попробовать снова</Button>
    </div>
  )
}

export default Error
