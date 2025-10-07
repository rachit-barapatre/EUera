import { useState } from 'react';
import StudentDrawer from '../StudentDrawer';
import { Button } from '@/components/ui/button';

export default function StudentDrawerExample() {
  const [open, setOpen] = useState(false);

  const sampleStudent = {
    id: "stu-001",
    name: "Alice Johnson",
    cognitiveState: "yellow" as const,
    metrics: {
      attention: 0.72,
      engagement: 0.65,
      stress: 0.45,
    },
  };

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)} data-testid="button-open-drawer">
        Open Student Details
      </Button>
      <StudentDrawer
        open={open}
        onClose={() => setOpen(false)}
        student={sampleStudent}
      />
    </div>
  );
}
