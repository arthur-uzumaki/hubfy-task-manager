import { TaskForm } from '@/app/(app)/task/task-form'
import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'

export default function CreateTakSheet() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Criar Task</SheetTitle>
        </SheetHeader>

        <div className="px-5">
          <TaskForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
