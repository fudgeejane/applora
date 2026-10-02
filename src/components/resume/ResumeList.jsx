import ResumeCard from './ResumeCard'

export default function ResumeList({ resumes }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {resumes.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} active={resume.id === 1} />
      ))}
    </div>
  )
}
