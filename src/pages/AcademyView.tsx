import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Play, 
  Sparkles, 
  Send, 
  HelpCircle, 
  ChevronRight,
  Clock,
  BarChart,
  Check,
  RefreshCw
} from 'lucide-react';
import { ACADEMY_COURSES } from '../lib/academy-store';
import { CourseModule } from '../types';

export const AcademyView: React.FC = () => {
  const [courses, setCourses] = useState<CourseModule[]>(ACADEMY_COURSES);
  const [selectedCourse, setSelectedCourse] = useState<CourseModule>(ACADEMY_COURSES[0]);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  
  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // AI Tutor Chat State
  const [tutorMessages, setTutorMessages] = useState<{ role: 'user' | 'tutor'; text: string }[]>([
    {
      role: 'tutor',
      text: 'Hello! I am your **6th Agent AI GTM Tutor**. Ask me anything about ROSTR v2, PAL compilation, n8n 5-pillar pipelines, or MEDDICC sales qualification!'
    }
  ]);
  const [tutorInput, setTutorInput] = useState<string>('');

  const handleSendTutorMessage = () => {
    if (!tutorInput.trim()) return;
    const userText = tutorInput;
    setTutorMessages(prev => [...prev, { role: 'user', text: userText }]);
    setTutorInput('');

    setTimeout(() => {
      let reply = `Great question regarding GTM architecture. In the ROSTR v2 framework, **PAL (Prompt Abstraction Layer)** compiles your raw commercial directive through 5 stages to eliminate ambiguity. Meanwhile, **NPAO** ensures hard blockers (Necessity) and cognitive friction (Anxiety) are resolved before executing priority revenue tasks.`;
      if (userText.toLowerCase().includes('n8n') || userText.toLowerCase().includes('workflow')) {
        reply = `The **5-Pillar Outbound Architecture** in n8n works by chaining: 1) Trigger Ingest (funding/hiring), 2) CRM Shield (HubSpot check), 3) Waterfall Enrichment (Clay/Apollo), 4) AI PAS Copywriter, and 5) Sequencer Enrollment (Smartlead). This guarantees you never double-email active leads!`;
      }
      setTutorMessages(prev => [...prev, { role: 'tutor', text: reply }]);
    }, 600);
  };

  const handleSelectQuizOption = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitQuiz = () => {
    let correct = 0;
    selectedCourse.quizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    setQuizScore(correct);
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  const activeLesson = selectedCourse.lessons[activeLessonIndex] || selectedCourse.lessons[0];

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-paper-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider mb-1">
            <GraduationCap className="h-4 w-4" />
            <span>GTM Engineering Academy</span>
          </div>
          <h1 className="text-3xl font-extrabold text-ink">
            Mastery Courses & GTM Certifications
          </h1>
          <p className="text-xs text-ink-muted mt-1">
            Master ROSTR v2 Multi-Agent Architecture, autonomous n8n workflows, and high-conversion sales engineering.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-brand-emerald/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-600">
            <Award className="h-4 w-4" />
            <span>3 Certifications Available</span>
          </div>
        </div>
      </div>

      {/* Course Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => {
          const isSelected = selectedCourse.id === course.id;
          return (
            <div
              key={course.id}
              onClick={() => {
                setSelectedCourse(course);
                setActiveLessonIndex(0);
                handleResetQuiz();
              }}
              className={`rounded-2xl border p-6 cursor-pointer transition-all shadow-card ${
                isSelected
                  ? 'border-brand-cyan bg-paper-50 shadow-glow-accent'
                  : 'border-paper-200 bg-paper-50/50 hover:border-paper-300 hover:bg-paper-50/80'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="rounded bg-paper-100 px-2 py-0.5 text-[10px] font-mono text-accent uppercase">
                  {course.level}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-ink-muted font-mono">
                  <Clock className="h-3 w-3" />
                  {course.duration}
                </span>
              </div>
              <h3 className="text-sm font-bold text-ink mb-2">{course.title}</h3>
              <p className="text-xs text-ink-muted leading-relaxed mb-4">{course.description}</p>
              <div className="flex items-center justify-between text-xs text-accent font-semibold">
                <span>{course.lessonsCount} Interactive Modules</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Course Content & AI Tutor Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Lesson Viewer & Certification Quiz */}
        <div className="lg:col-span-8 space-y-6">
          {/* Lesson Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-paper-200">
            {selectedCourse.lessons.map((les, idx) => (
              <button
                key={les.id}
                onClick={() => setActiveLessonIndex(idx)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeLessonIndex === idx
                    ? 'bg-accent text-white shadow-sm'
                    : 'bg-paper-50 text-ink-muted hover:text-ink border border-paper-200'
                }`}
              >
                <span>Module {idx + 1}</span>
                {les.completed && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
              </button>
            ))}
          </div>

          {/* Active Lesson Reader */}
          <div className="rounded-2xl border border-paper-200 bg-paper-50/70 p-6 sm:p-8 space-y-6 shadow-card">
            <div className="flex items-center justify-between pb-4 border-b border-paper-200">
              <h2 className="text-xl font-bold text-ink">{activeLesson.title}</h2>
              <span className="text-xs text-ink-muted font-mono">{activeLesson.duration}</span>
            </div>

            <div className="prose prose-invert prose-sm max-w-none text-ink leading-relaxed">
              <div className="whitespace-pre-wrap font-sans text-xs">
                {activeLesson.content}
              </div>
            </div>
          </div>

          {/* Certification Quiz Section */}
          <div className="rounded-2xl border border-paper-200 bg-paper-50/60 p-6 sm:p-8 space-y-6 shadow-card">
            <div className="flex items-center justify-between pb-4 border-b border-paper-200">
              <div className="flex items-center gap-2.5">
                <Award className="h-5 w-5 text-accent" />
                <div>
                  <h3 className="text-base font-bold text-ink">Certification Exam: {selectedCourse.badgeName}</h3>
                  <p className="text-xs text-ink-muted">Pass with 100% to claim your verifiable badge.</p>
                </div>
              </div>
              {quizSubmitted && (
                <span className={`rounded-full px-3 py-1 text-xs font-bold font-mono ${
                  quizScore === selectedCourse.quizQuestions.length 
                    ? 'bg-emerald-500/20 text-emerald-600 border border-brand-emerald/40'
                    : 'bg-red-500/20 text-red-400 border border-red-500/40'
                }`}>
                  Score: {quizScore} / {selectedCourse.quizQuestions.length}
                </span>
              )}
            </div>

            <div className="space-y-6">
              {selectedCourse.quizQuestions.map((q, qIdx) => (
                <div key={qIdx} className="space-y-3">
                  <p className="text-xs font-semibold text-ink">
                    {qIdx + 1}. {q.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[qIdx] === optIdx;
                      const isCorrect = q.correctIndex === optIdx;
                      let btnStyle = 'border-paper-200 bg-white text-ink-soft hover:border-paper-300';

                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'border-brand-emerald bg-emerald-500/20 text-emerald-600 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'border-red-500 bg-red-500/20 text-red-400';
                        }
                      } else if (isSelected) {
                        btnStyle = 'border-brand-cyan bg-accent/20 text-accent font-bold';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                          className={`rounded-xl border p-3 text-left text-xs transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-paper-200">
              {quizSubmitted ? (
                <button
                  onClick={handleResetQuiz}
                  className="flex items-center gap-1.5 text-xs text-accent hover:underline font-semibold"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Retake Exam</span>
                </button>
              ) : (
                <span className="text-xs text-ink-faint">Answer all questions to submit.</span>
              )}

              {!quizSubmitted && (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(quizAnswers).length !== selectedCourse.quizQuestions.length}
                  className="rounded-xl bg-accent px-6 py-2.5 text-xs font-bold text-ink hover:bg-accent/90 disabled:opacity-50 transition-colors"
                >
                  Submit for Certification
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive AI Tutor Chat Widget */}
        <div className="lg:col-span-4 flex flex-col rounded-2xl border border-paper-200 bg-paper-50/80 p-5 shadow-card h-[680px]">
          <div className="flex items-center justify-between pb-3 border-b border-paper-200">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-xs font-bold text-ink">AI GTM Academy Tutor</span>
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 py-3 pr-1 text-xs">
            {tutorMessages.map((m, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-accent/20 text-ink border border-brand-cyan/30 ml-4'
                    : 'bg-white text-ink-soft border border-paper-200 mr-2'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="pt-3 border-t border-paper-200 flex gap-2">
            <input
              type="text"
              value={tutorInput}
              onChange={(e) => setTutorInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendTutorMessage()}
              placeholder="Ask AI Tutor a question..."
              className="flex-1 rounded-xl border border-paper-300 bg-white px-3 py-2 text-xs text-ink placeholder-obsidian-500 focus:border-brand-cyan focus:outline-none"
            />
            <button
              onClick={handleSendTutorMessage}
              className="rounded-xl bg-accent px-3.5 py-2 text-xs font-bold text-ink hover:bg-accent/90 transition-colors"
            >
              <Send className="h-3.5 w-3.5 fill-obsidian-950" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
