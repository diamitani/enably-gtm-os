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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-obsidian-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1">
            <GraduationCap className="h-4 w-4" />
            <span>GTM Engineering Academy</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Mastery Courses & GTM Certifications
          </h1>
          <p className="text-xs text-obsidian-400 mt-1">
            Master ROSTR v2 Multi-Agent Architecture, autonomous n8n workflows, and high-conversion sales engineering.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-brand-emerald/30 bg-brand-emerald/10 px-4 py-2 text-xs font-semibold text-brand-emerald">
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
              className={`rounded-2xl border p-6 cursor-pointer transition-all shadow-glass-card ${
                isSelected
                  ? 'border-brand-cyan bg-obsidian-900 shadow-glow-cyan'
                  : 'border-obsidian-800 bg-obsidian-900/50 hover:border-obsidian-700 hover:bg-obsidian-900/80'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="rounded bg-obsidian-800 px-2 py-0.5 text-[10px] font-mono text-brand-cyan uppercase">
                  {course.level}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-obsidian-400 font-mono">
                  <Clock className="h-3 w-3" />
                  {course.duration}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-2">{course.title}</h3>
              <p className="text-xs text-obsidian-400 leading-relaxed mb-4">{course.description}</p>
              <div className="flex items-center justify-between text-xs text-brand-cyan font-semibold">
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
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-obsidian-800">
            {selectedCourse.lessons.map((les, idx) => (
              <button
                key={les.id}
                onClick={() => setActiveLessonIndex(idx)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeLessonIndex === idx
                    ? 'bg-brand-cyan text-obsidian-950 shadow-sm'
                    : 'bg-obsidian-900 text-obsidian-400 hover:text-white border border-obsidian-800'
                }`}
              >
                <span>Module {idx + 1}</span>
                {les.completed && <CheckCircle2 className="h-3.5 w-3.5 text-brand-emerald" />}
              </button>
            ))}
          </div>

          {/* Active Lesson Reader */}
          <div className="rounded-2xl border border-obsidian-800 bg-obsidian-900/70 p-6 sm:p-8 space-y-6 shadow-glass-card">
            <div className="flex items-center justify-between pb-4 border-b border-obsidian-800">
              <h2 className="text-xl font-bold text-white">{activeLesson.title}</h2>
              <span className="text-xs text-obsidian-400 font-mono">{activeLesson.duration}</span>
            </div>

            <div className="prose prose-invert prose-sm max-w-none text-obsidian-200 leading-relaxed">
              <div className="whitespace-pre-wrap font-sans text-xs">
                {activeLesson.content}
              </div>
            </div>
          </div>

          {/* Certification Quiz Section */}
          <div className="rounded-2xl border border-obsidian-800 bg-obsidian-900/60 p-6 sm:p-8 space-y-6 shadow-glass-card">
            <div className="flex items-center justify-between pb-4 border-b border-obsidian-800">
              <div className="flex items-center gap-2.5">
                <Award className="h-5 w-5 text-brand-cyan" />
                <div>
                  <h3 className="text-base font-bold text-white">Certification Exam: {selectedCourse.badgeName}</h3>
                  <p className="text-xs text-obsidian-400">Pass with 100% to claim your verifiable badge.</p>
                </div>
              </div>
              {quizSubmitted && (
                <span className={`rounded-full px-3 py-1 text-xs font-bold font-mono ${
                  quizScore === selectedCourse.quizQuestions.length 
                    ? 'bg-brand-emerald/20 text-brand-emerald border border-brand-emerald/40'
                    : 'bg-red-500/20 text-red-400 border border-red-500/40'
                }`}>
                  Score: {quizScore} / {selectedCourse.quizQuestions.length}
                </span>
              )}
            </div>

            <div className="space-y-6">
              {selectedCourse.quizQuestions.map((q, qIdx) => (
                <div key={qIdx} className="space-y-3">
                  <p className="text-xs font-semibold text-white">
                    {qIdx + 1}. {q.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[qIdx] === optIdx;
                      const isCorrect = q.correctIndex === optIdx;
                      let btnStyle = 'border-obsidian-800 bg-obsidian-950 text-obsidian-300 hover:border-obsidian-700';

                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'border-brand-emerald bg-brand-emerald/20 text-brand-emerald font-bold';
                        } else if (isSelected) {
                          btnStyle = 'border-red-500 bg-red-500/20 text-red-400';
                        }
                      } else if (isSelected) {
                        btnStyle = 'border-brand-cyan bg-brand-cyan/20 text-brand-cyan font-bold';
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

            <div className="flex items-center justify-between pt-4 border-t border-obsidian-800">
              {quizSubmitted ? (
                <button
                  onClick={handleResetQuiz}
                  className="flex items-center gap-1.5 text-xs text-brand-cyan hover:underline font-semibold"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Retake Exam</span>
                </button>
              ) : (
                <span className="text-xs text-obsidian-500">Answer all questions to submit.</span>
              )}

              {!quizSubmitted && (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(quizAnswers).length !== selectedCourse.quizQuestions.length}
                  className="rounded-xl bg-brand-cyan px-6 py-2.5 text-xs font-bold text-obsidian-950 hover:bg-brand-cyan/90 disabled:opacity-50 transition-colors"
                >
                  Submit for Certification
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive AI Tutor Chat Widget */}
        <div className="lg:col-span-4 flex flex-col rounded-2xl border border-obsidian-800 bg-obsidian-900/80 p-5 shadow-glass-card h-[680px]">
          <div className="flex items-center justify-between pb-3 border-b border-obsidian-800">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand-cyan" />
              <span className="text-xs font-bold text-white">AI GTM Academy Tutor</span>
            </div>
            <span className="h-2 w-2 rounded-full bg-brand-emerald animate-pulse"></span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 py-3 pr-1 text-xs">
            {tutorMessages.map((m, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-brand-cyan/20 text-white border border-brand-cyan/30 ml-4'
                    : 'bg-obsidian-950 text-obsidian-300 border border-obsidian-800 mr-2'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="pt-3 border-t border-obsidian-800 flex gap-2">
            <input
              type="text"
              value={tutorInput}
              onChange={(e) => setTutorInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendTutorMessage()}
              placeholder="Ask AI Tutor a question..."
              className="flex-1 rounded-xl border border-obsidian-700 bg-obsidian-950 px-3 py-2 text-xs text-white placeholder-obsidian-500 focus:border-brand-cyan focus:outline-none"
            />
            <button
              onClick={handleSendTutorMessage}
              className="rounded-xl bg-brand-cyan px-3.5 py-2 text-xs font-bold text-obsidian-950 hover:bg-brand-cyan/90 transition-colors"
            >
              <Send className="h-3.5 w-3.5 fill-obsidian-950" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
