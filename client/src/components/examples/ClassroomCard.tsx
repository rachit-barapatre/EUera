import ClassroomCard from '../ClassroomCard';

export default function ClassroomCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <ClassroomCard
        id="cls-001"
        name="Advanced Mathematics"
        subject="Mathematics"
        studentsCount={28}
        onViewDetails={() => console.log('View classroom')}
      />
      <ClassroomCard
        id="cls-002"
        name="Physics Fundamentals"
        subject="Physics"
        studentsCount={32}
        onViewDetails={() => console.log('View classroom')}
      />
      <ClassroomCard
        id="cls-003"
        name="English Literature"
        subject="English"
        studentsCount={25}
        onViewDetails={() => console.log('View classroom')}
      />
    </div>
  );
}
