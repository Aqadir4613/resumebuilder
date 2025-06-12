import React, { useState, useEffect, useRef } from 'react';
import { Download, Eye, Plus, Minus, RotateCcw, Maximize2, RefreshCw, X, Bold, Italic, Underline, List, ListOrdered, Type, ArrowLeft, ArrowRight, ChevronLeft, Edit3, User, Briefcase, GraduationCap, Settings, FolderOpen, Award, Palette, Star, Zap, Circle, Square } from 'lucide-react';

const ResumeBuilder = () => {
  const [currentTemplate, setCurrentTemplate] = useState(1);
  const [previewScale, setPreviewScale] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentView, setCurrentView] = useState('templates');
  const [activeSection, setActiveSection] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: 'John Doe',
      professionalTitle: 'Software Developer',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/johndoe',
      website: 'johndoe.dev',
      summary: 'Experienced software developer with expertise in modern web technologies and a passion for creating innovative solutions.'
    },
    experience: [
      {
        id: 1,
        position: 'Senior Software Developer',
        company: 'Tech Company Inc.',
        startDate: '2022',
        endDate: 'Present',
        description: 'Led development of web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.'
      }
    ],
    education: [
      {
        id: 1,
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of Technology',
        year: '2020',
        description: 'Graduated with honors. Focused on software engineering and web development.'
      }
    ],
    skills: [
      {
        id: 1,
        name: 'Frontend Development',
        tools: ['React', 'JavaScript', 'TypeScript', 'HTML/CSS']
      },
      {
        id: 2,
        name: 'Backend Development',
        tools: ['Node.js', 'Python', 'MongoDB', 'PostgreSQL']
      }
    ],
    projects: [
      {
        id: 1,
        name: 'Resume Builder App',
        description: 'Built a modern resume builder with React and real-time preview functionality.',
        technologies: 'React, TailwindCSS, JavaScript',
        url: 'https://resume.placed.today'
      }
    ],
    certifications: [
      {
        id: 1,
        name: 'AWS Certified Developer',
        issuer: 'Amazon Web Services',
        date: '2023',
        expiryDate: '2026',
        credentialId: 'AWS-123456',
        url: '',
        description: 'Certified in AWS cloud development and deployment practices.'
      }
    ]
  });

  // HTML Editor Component
  const HtmlEditor = ({ value, onChange, placeholder = "Enter description...", minHeight = "100px" }) => {
    const editorRef = useRef(null);

    useEffect(() => {
      if (editorRef.current && value !== editorRef.current.innerHTML) {
        editorRef.current.innerHTML = value || '';
      }
    }, [value]);

    const formatText = (command, value = null) => {
      document.execCommand(command, false, value);
      if (onChange) {
        onChange(editorRef.current.innerHTML);
      }
    };

    const handleInput = () => {
      if (onChange) {
        onChange(editorRef.current.innerHTML);
      }
    };

    return (
      <div className="editor-container">
        <div className="editor-toolbar bg-gray-50 border border-gray-200 rounded-t-lg p-2 flex gap-2 flex-wrap">
          <button
            type="button"
            className="editor-btn bg-white border border-gray-300 rounded px-2 py-1 text-xs hover:bg-indigo-500 hover:text-white transition-colors"
            onClick={() => formatText('bold')}
            title="Bold"
          >
            <Bold size={12} />
          </button>
          <button
            type="button"
            className="editor-btn bg-white border border-gray-300 rounded px-2 py-1 text-xs hover:bg-indigo-500 hover:text-white transition-colors"
            onClick={() => formatText('italic')}
            title="Italic"
          >
            <Italic size={12} />
          </button>
          <button
            type="button"
            className="editor-btn bg-white border border-gray-300 rounded px-2 py-1 text-xs hover:bg-indigo-500 hover:text-white transition-colors"
            onClick={() => formatText('underline')}
            title="Underline"
          >
            <Underline size={12} />
          </button>
          <button
            type="button"
            className="editor-btn bg-white border border-gray-300 rounded px-2 py-1 text-xs hover:bg-indigo-500 hover:text-white transition-colors"
            onClick={() => formatText('insertUnorderedList')}
            title="Bullet List"
          >
            <List size={12} />
          </button>
          <button
            type="button"
            className="editor-btn bg-white border border-gray-300 rounded px-2 py-1 text-xs hover:bg-indigo-500 hover:text-white transition-colors"
            onClick={() => formatText('insertOrderedList')}
            title="Numbered List"
          >
            <ListOrdered size={12} />
          </button>
          <button
            type="button"
            className="editor-btn bg-white border border-gray-300 rounded px-2 py-1 text-xs hover:bg-indigo-500 hover:text-white transition-colors"
            onClick={() => formatText('removeFormat')}
            title="Clear Formatting"
          >
            <Type size={12} />
          </button>
        </div>
        <div
          ref={editorRef}
          className="html-editor border-2 border-gray-200 rounded-b-lg p-3 bg-white focus:border-indigo-500 focus:outline-none transition-colors font-inter text-sm leading-relaxed"
          contentEditable="true"
          onInput={handleInput}
          style={{ minHeight }}
          data-placeholder={placeholder}
        />
      </div>
    );
  };

  // Template Components
  const ModernTemplate = ({ data }) => (
    <div className="template-modern text-xs leading-snug">
      <div className="header bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 text-center -m-5 mb-5">
        <h1 className="text-2xl mb-1 font-semibold">{data.personal.fullName || 'Your Name'}</h1>
        <div className="text-base opacity-90 mb-4">{data.personal.professionalTitle || 'Your Title'}</div>
        <div className="contact-info text-xs flex justify-center gap-4 flex-wrap">
          {data.personal.email && <span>📧 {data.personal.email}</span>}
          {data.personal.phone && <span>📞 {data.personal.phone}</span>}
          {data.personal.location && <span>📍 {data.personal.location}</span>}
          {data.personal.linkedin && <span>🔗 {data.personal.linkedin}</span>}
        </div>
      </div>
      <div className="content grid grid-cols-2 gap-8">
        <div>
          {data.personal.summary && (
            <div className="section mb-6">
              <h3 className="text-indigo-500 text-base mb-4 border-b-2 border-indigo-500 pb-1">Professional Summary</h3>
              <div className="text-xs" dangerouslySetInnerHTML={{ __html: data.personal.summary }} />
            </div>
          )}
          
          {data.experience.length > 0 && (
            <div className="section mb-6">
              <h3 className="text-indigo-500 text-base mb-4 border-b-2 border-indigo-500 pb-1">Work Experience</h3>
              {data.experience.map((exp, index) => (
                <div key={index} className="experience-item mb-5 pb-4 border-b border-gray-100 last:border-b-0">
                  <div className="font-semibold text-gray-800 mb-1">{exp.position}</div>
                  <div className="text-gray-600 text-xs mb-2">{exp.company} • {exp.startDate} - {exp.endDate}</div>
                  <div className="text-xs text-gray-700" dangerouslySetInnerHTML={{ __html: exp.description }} />
                </div>
              ))}
            </div>
          )}
          
          {data.education.length > 0 && (
            <div className="section mb-6">
              <h3 className="text-indigo-500 text-base mb-4 border-b-2 border-indigo-500 pb-1">Education</h3>
              {data.education.map((edu, index) => (
                <div key={index} className="education-item mb-5 pb-4 border-b border-gray-100 last:border-b-0">
                  <div className="font-semibold text-gray-800 mb-1">{edu.degree}</div>
                  <div className="text-gray-600 text-xs mb-2">{edu.institution} • {edu.year}</div>
                  {edu.description && <div className="text-xs text-gray-700" dangerouslySetInnerHTML={{ __html: edu.description }} />}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div>
          {data.skills.length > 0 && (
            <div className="section mb-6">
              <h3 className="text-indigo-500 text-base mb-4 border-b-2 border-indigo-500 pb-1">Skills & Technologies</h3>
              {data.skills.map((skill, index) => (
                <div key={index} className="mb-4">
                  <div className="text-xs font-semibold text-indigo-500 mb-1">{skill.name}</div>
                  {skill.tools && skill.tools.length > 0 && (
                    <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                      {skill.tools.map((tool, toolIndex) => (
                        <li key={toolIndex}>{tool}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {data.projects.length > 0 && (
            <div className="section mb-6">
              <h3 className="text-indigo-500 text-base mb-4 border-b-2 border-indigo-500 pb-1">Projects</h3>
              {data.projects.map((project, index) => (
                <div key={index} className="experience-item mb-5 pb-4 border-b border-gray-100 last:border-b-0">
                  <div className="font-semibold text-gray-800 mb-1">{project.name}</div>
                  <div className="text-xs text-gray-600 mb-2">{project.technologies}</div>
                  <div className="text-xs text-gray-700" dangerouslySetInnerHTML={{ __html: project.description }} />
                </div>
              ))}
            </div>
          )}
          
          {data.certifications.length > 0 && (
            <div className="section mb-6">
              <h3 className="text-indigo-500 text-base mb-4 border-b-2 border-indigo-500 pb-1">Certifications</h3>
              {data.certifications.map((cert, index) => (
                <div key={index} className="experience-item mb-5 pb-4 border-b border-gray-100 last:border-b-0">
                  <div className="font-semibold text-gray-800 mb-1">{cert.name}</div>
                  <div className="text-gray-600 text-xs mb-2">{cert.issuer} • {cert.date}</div>
                  {cert.description && <div className="text-xs text-gray-700" dangerouslySetInnerHTML={{ __html: cert.description }} />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const ClassicTemplate = ({ data }) => (
    <div className="template-classic text-xs leading-snug">
      <div className="header text-center border-b-2 border-gray-800 pb-5 mb-8">
        <h1 className="text-3xl text-gray-800 mb-3 font-bold">{data.personal.fullName || 'Your Name'}</h1>
        <div className="text-sm">{[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join(' | ')}</div>
      </div>
      
      {data.personal.summary && (
        <div className="section mb-8">
          <h3 className="text-gray-800 text-lg mb-3 uppercase tracking-wide border-b border-gray-400 pb-1">Professional Summary</h3>
          <div className="text-xs" dangerouslySetInnerHTML={{ __html: data.personal.summary }} />
        </div>
      )}
      
      {data.experience.length > 0 && (
        <div className="section mb-8">
          <h3 className="text-gray-800 text-lg mb-3 uppercase tracking-wide border-b border-gray-400 pb-1">Experience</h3>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="font-bold text-gray-800">{exp.position}</div>
              <div className="text-gray-600 italic mb-2">{exp.company} | {exp.startDate} - {exp.endDate}</div>
              <div className="text-xs" dangerouslySetInnerHTML={{ __html: exp.description }} />
            </div>
          ))}
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-8">
        <div>
          {data.education.length > 0 && (
            <div className="section mb-8">
              <h3 className="text-gray-800 text-lg mb-3 uppercase tracking-wide border-b border-gray-400 pb-1">Education</h3>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="font-bold text-gray-800">{edu.degree}</div>
                  <div className="text-gray-600">{edu.institution} | {edu.year}</div>
                  {edu.description && <div className="text-xs mt-1" dangerouslySetInnerHTML={{ __html: edu.description }} />}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          {data.skills.length > 0 && (
            <div className="section mb-8">
              <h3 className="text-gray-800 text-lg mb-3 uppercase tracking-wide border-b border-gray-400 pb-1">Skills</h3>
              {data.skills.map((skill, index) => (
                <div key={index} className="mb-3">
                  <div className="font-semibold text-gray-800 mb-1">{skill.name}</div>
                  <div className="text-xs text-gray-600">{skill.tools?.join(', ')}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const CreativeTemplate = ({ data }) => (
    <div className="template-creative text-xs leading-snug">
      <div className="header bg-gradient-to-r from-pink-500 to-orange-500 text-white p-6 -m-5 mb-6 transform -skew-y-1">
        <div className="transform skew-y-1">
          <h1 className="text-2xl font-bold mb-2">{data.personal.fullName || 'Your Name'}</h1>
          <div className="text-base mb-4">{data.personal.professionalTitle || 'Your Title'}</div>
          <div className="flex gap-4 text-xs">
            {data.personal.email && <span>✉️ {data.personal.email}</span>}
            {data.personal.phone && <span>📱 {data.personal.phone}</span>}
            {data.personal.location && <span>🌍 {data.personal.location}</span>}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          {data.personal.summary && (
            <div className="section mb-6">
              <h3 className="text-pink-500 text-base font-bold mb-3 flex items-center">
                <Star className="mr-2" size={16} />
                About Me
              </h3>
              <div className="text-xs bg-pink-50 p-3 rounded-lg" dangerouslySetInnerHTML={{ __html: data.personal.summary }} />
            </div>
          )}
          
          {data.experience.length > 0 && (
            <div className="section mb-6">
              <h3 className="text-orange-500 text-base font-bold mb-3 flex items-center">
                <Briefcase className="mr-2" size={16} />
                Experience
              </h3>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-4 border-l-4 border-orange-300 pl-4">
                  <div className="font-bold text-gray-800">{exp.position}</div>
                  <div className="text-orange-600 font-medium">{exp.company}</div>
                  <div className="text-xs text-gray-500 mb-2">{exp.startDate} - {exp.endDate}</div>
                  <div className="text-xs" dangerouslySetInnerHTML={{ __html: exp.description }} />
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div>
          {data.skills.length > 0 && (
            <div className="section mb-6">
              <h3 className="text-purple-500 text-base font-bold mb-3 flex items-center">
                <Zap className="mr-2" size={16} />
                Skills
              </h3>
              {data.skills.map((skill, index) => (
                <div key={index} className="mb-3 bg-purple-50 p-2 rounded">
                  <div className="font-semibold text-purple-700 text-xs">{skill.name}</div>
                  <div className="text-xs text-gray-600">{skill.tools?.join(', ')}</div>
                </div>
              ))}
            </div>
          )}
          
          {data.education.length > 0 && (
            <div className="section mb-6">
              <h3 className="text-green-500 text-base font-bold mb-3 flex items-center">
                <GraduationCap className="mr-2" size={16} />
                Education
              </h3>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-3 bg-green-50 p-2 rounded">
                  <div className="font-semibold text-green-700 text-xs">{edu.degree}</div>
                  <div className="text-xs text-gray-600">{edu.institution}</div>
                  <div className="text-xs text-gray-500">{edu.year}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const MinimalistTemplate = ({ data }) => (
    <div className="template-minimalist text-xs leading-relaxed">
      <div className="header border-b border-gray-300 pb-6 mb-8">
        <h1 className="text-3xl font-light text-gray-800 mb-2">{data.personal.fullName || 'Your Name'}</h1>
        <div className="text-gray-600 mb-4">{data.personal.professionalTitle || 'Your Title'}</div>
        <div className="text-xs text-gray-500 space-x-4">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {data.personal.location && <span>{data.personal.location}</span>}
        </div>
      </div>
      
      {data.personal.summary && (
        <div className="section mb-8">
          <div className="text-xs text-gray-700" dangerouslySetInnerHTML={{ __html: data.personal.summary }} />
        </div>
      )}
      
      {data.experience.length > 0 && (
        <div className="section mb-8">
          <h3 className="text-gray-800 text-sm font-medium mb-4 uppercase tracking-wider">Experience</h3>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium text-gray-800">{exp.position}</div>
                <div className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</div>
              </div>
              <div className="text-gray-600 text-xs mb-2">{exp.company}</div>
              <div className="text-xs text-gray-700" dangerouslySetInnerHTML={{ __html: exp.description }} />
            </div>
          ))}
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-8">
        <div>
          {data.education.length > 0 && (
            <div className="section mb-8">
              <h3 className="text-gray-800 text-sm font-medium mb-4 uppercase tracking-wider">Education</h3>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="font-medium text-gray-800 text-xs">{edu.degree}</div>
                  <div className="text-gray-600 text-xs">{edu.institution}</div>
                  <div className="text-gray-500 text-xs">{edu.year}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          {data.skills.length > 0 && (
            <div className="section mb-8">
              <h3 className="text-gray-800 text-sm font-medium mb-4 uppercase tracking-wider">Skills</h3>
              {data.skills.map((skill, index) => (
                <div key={index} className="mb-3">
                  <div className="font-medium text-gray-800 text-xs">{skill.name}</div>
                  <div className="text-xs text-gray-600">{skill.tools?.join(', ')}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const ExecutiveTemplate = ({ data }) => (
    <div className="template-executive text-xs leading-snug">
      <div className="header bg-gray-900 text-white p-8 -m-5 mb-6">
        <h1 className="text-2xl font-bold mb-2">{data.personal.fullName || 'Your Name'}</h1>
        <div className="text-lg mb-4 text-gray-300">{data.personal.professionalTitle || 'Your Title'}</div>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            {data.personal.email && <div>📧 {data.personal.email}</div>}
            {data.personal.phone && <div>📞 {data.personal.phone}</div>}
          </div>
          <div>
            {data.personal.location && <div>📍 {data.personal.location}</div>}
            {data.personal.linkedin && <div>💼 {data.personal.linkedin}</div>}
          </div>
        </div>
      </div>
      
      {data.personal.summary && (
        <div className="section mb-6">
          <h3 className="text-gray-900 text-base font-bold mb-3 border-b-2 border-gray-900 pb-1">Executive Summary</h3>
          <div className="text-xs bg-gray-50 p-4 rounded" dangerouslySetInnerHTML={{ __html: data.personal.summary }} />
        </div>
      )}
      
      {data.experience.length > 0 && (
        <div className="section mb-6">
          <h3 className="text-gray-900 text-base font-bold mb-3 border-b-2 border-gray-900 pb-1">Professional Experience</h3>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-6 bg-white border border-gray-200 p-4 rounded">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-bold text-gray-900">{exp.position}</div>
                  <div className="text-gray-700 font-medium">{exp.company}</div>
                </div>
                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {exp.startDate} - {exp.endDate}
                </div>
              </div>
              <div className="text-xs text-gray-700" dangerouslySetInnerHTML={{ __html: exp.description }} />
            </div>
          ))}
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          {data.education.length > 0 && (
            <div className="section mb-6">
              <h3 className="text-gray-900 text-base font-bold mb-3 border-b-2 border-gray-900 pb-1">Education</h3>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-3 bg-gray-50 p-3 rounded">
                  <div className="font-bold text-gray-900 text-xs">{edu.degree}</div>
                  <div className="text-gray-700 text-xs">{edu.institution}</div>
                  <div className="text-gray-500 text-xs">{edu.year}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          {data.skills.length > 0 && (
            <div className="section mb-6">
              <h3 className="text-gray-900 text-base font-bold mb-3 border-b-2 border-gray-900 pb-1">Core Competencies</h3>
              {data.skills.map((skill, index) => (
                <div key={index} className="mb-3">
                  <div className="font-bold text-gray-900 text-xs">{skill.name}</div>
                  <div className="text-xs text-gray-600">{skill.tools?.join(' • ')}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Template rendering function
  const renderTemplate = () => {
    const templateProps = { data: resumeData };

    switch(currentTemplate) {
      case 1: return <ModernTemplate {...templateProps} />;
      case 2: return <ClassicTemplate {...templateProps} />;
      case 3: return <CreativeTemplate {...templateProps} />;
      case 4: return <MinimalistTemplate {...templateProps} />;
      case 5: return <ExecutiveTemplate {...templateProps} />;
      default: return <ModernTemplate {...templateProps} />;
    }
  };

  // Enhanced PDF download function
  const downloadPDF = async () => {
    setIsDownloading(true);
    try {
      // Wait for re-render
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      const resumeContent = document.querySelector('.resume-preview');
      
      if (printWindow && resumeContent) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>${resumeData.personal.fullName || 'Resume'} - Resume</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                line-height: 1.4;
                color: #333;
                background: white;
              }
              @page { 
                size: A4; 
                margin: 0.5in; 
              }
              @media print {
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .no-print { display: none !important; }
              }
              .resume-content {
                max-width: 8.5in;
                margin: 0 auto;
                background: white;
                padding: 20px;
              }
              .text-xs { font-size: 0.75rem; }
              .text-sm { font-size: 0.875rem; }
              .text-base { font-size: 1rem; }
              .text-lg { font-size: 1.125rem; }
              .text-xl { font-size: 1.25rem; }
              .text-2xl { font-size: 1.5rem; }
              .text-3xl { font-size: 1.875rem; }
              .font-bold { font-weight: 700; }
              .font-semibold { font-weight: 600; }
              .font-medium { font-weight: 500; }
              .font-light { font-weight: 300; }
              .leading-snug { line-height: 1.375; }
              .leading-relaxed { line-height: 1.625; }
              .leading-tight { line-height: 1.25; }
              .mb-1 { margin-bottom: 0.25rem; }
              .mb-2 { margin-bottom: 0.5rem; }
              .mb-3 { margin-bottom: 0.75rem; }
              .mb-4 { margin-bottom: 1rem; }
              .mb-5 { margin-bottom: 1.25rem; }
              .mb-6 { margin-bottom: 1.5rem; }
              .mb-8 { margin-bottom: 2rem; }
              .p-2 { padding: 0.5rem; }
              .p-3 { padding: 0.75rem; }
              .p-4 { padding: 1rem; }
              .p-6 { padding: 1.5rem; }
              .p-8 { padding: 2rem; }
              .pb-1 { padding-bottom: 0.25rem; }
              .pb-4 { padding-bottom: 1rem; }
              .pb-5 { padding-bottom: 1.25rem; }
              .pb-6 { padding-bottom: 1.5rem; }
              .grid { display: grid; }
              .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
              .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
              .col-span-2 { grid-column: span 2 / span 2; }
              .gap-4 { gap: 1rem; }
              .gap-6 { gap: 1.5rem; }
              .gap-8 { gap: 2rem; }
              .flex { display: flex; }
              .items-center { align-items: center; }
              .items-start { align-items: flex-start; }
              .justify-center { justify-content: center; }
              .justify-between { justify-content: space-between; }
              .text-center { text-align: center; }
              .border-b { border-bottom-width: 1px; }
              .border-b-2 { border-bottom-width: 2px; }
              .border-l-4 { border-left-width: 4px; }
              .border-gray-100 { border-color: #f3f4f6; }
              .border-gray-200 { border-color: #e5e7eb; }
              .border-gray-300 { border-color: #d1d5db; }
              .border-gray-400 { border-color: #9ca3af; }
              .border-gray-800 { border-color: #1f2937; }
              .border-gray-900 { border-color: #111827; }
              .border-indigo-500 { border-color: #6366f1; }
              .border-orange-300 { border-color: #fdba74; }
              .bg-white { background-color: #ffffff; }
              .bg-gray-50 { background-color: #f9fafb; }
              .bg-gray-100 { background-color: #f3f4f6; }
              .bg-gray-900 { background-color: #111827; }
              .bg-pink-50 { background-color: #fdf2f8; }
              .bg-purple-50 { background-color: #faf5ff; }
              .bg-green-50 { background-color: #f0fdf4; }
              .text-white { color: #ffffff; }
              .text-gray-300 { color: #d1d5db; }
              .text-gray-500 { color: #6b7280; }
              .text-gray-600 { color: #4b5563; }
              .text-gray-700 { color: #374151; }
              .text-gray-800 { color: #1f2937; }
              .text-gray-900 { color: #111827; }
              .text-indigo-500 { color: #6366f1; }
              .text-purple-500 { color: #a855f7; }
              .text-purple-700 { color: #7c3aed; }
              .text-pink-500 { color: #ec4899; }
              .text-orange-500 { color: #f97316; }
              .text-orange-600 { color: #ea580c; }
              .text-green-500 { color: #22c55e; }
              .text-green-700 { color: #15803d; }
              .bg-gradient-to-br { background: linear-gradient(to bottom right, #6366f1, #9333ea); }
              .bg-gradient-to-r { background: linear-gradient(to right, #ec4899, #f97316); }
              .rounded { border-radius: 0.25rem; }
              .rounded-lg { border-radius: 0.5rem; }
              .uppercase { text-transform: uppercase; }
              .italic { font-style: italic; }
              .tracking-wide { letter-spacing: 0.025em; }
              .tracking-wider { letter-spacing: 0.05em; }
              .opacity-90 { opacity: 0.9; }
              .space-x-4 > * + * { margin-left: 1rem; }
              .space-y-1 > * + * { margin-top: 0.25rem; }
              .list-disc { list-style-type: disc; }
              .list-inside { list-style-position: inside; }
              .transform { transform: translateZ(0); }
              .-skew-y-1 { transform: skewY(-1deg); }
              .skew-y-1 { transform: skewY(1deg); }
              .mr-2 { margin-right: 0.5rem; }
              .pl-4 { padding-left: 1rem; }
              .last\\:border-b-0:last-child { border-bottom-width: 0px; }
            </style>
          </head>
          <body>
            <div class="resume-content">
              ${resumeContent.innerHTML}
            </div>
          </body>
          </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        
        // Wait for content to load then print
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      }
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Templates data with more variety
  const templates = [
    { id: 1, name: 'Modern', desc: 'Professional & Eye-catching', color: 'bg-indigo-500', icon: '🎨' },
    { id: 2, name: 'Classic', desc: 'Traditional & Clean', color: 'bg-gray-600', icon: '📄' },
    { id: 3, name: 'Creative', desc: 'Colorful & Unique', color: 'bg-pink-500', icon: '🎭' },
    { id: 4, name: 'Minimalist', desc: 'Simple & Elegant', color: 'bg-gray-400', icon: '⚪' },
    { id: 5, name: 'Executive', desc: 'Professional Leadership', color: 'bg-gray-800', icon: '💼' }
  ];

  // Section widgets data
  const sectionWidgets = [
    { id: 'personal', name: 'Personal Info', icon: User, color: 'bg-blue-500', description: 'Name, contact, summary' },
    { id: 'experience', name: 'Experience', icon: Briefcase, color: 'bg-green-500', description: 'Work history' },
    { id: 'education', name: 'Education', icon: GraduationCap, color: 'bg-purple-500', description: 'Academic background' },
    { id: 'skills', name: 'Skills', icon: Settings, color: 'bg-orange-500', description: 'Technical & soft skills' },
    { id: 'projects', name: 'Projects', icon: FolderOpen, color: 'bg-cyan-500', description: 'Portfolio projects' },
    { id: 'certifications', name: 'Certifications', icon: Award, color: 'bg-red-500', description: 'Professional certifications' }
  ];

  const getSectionIndex = (sectionId) => sectionWidgets.findIndex(s => s.id === sectionId);
  const getCurrentSectionData = () => sectionWidgets.find(s => s.id === activeSection);

  const navigateSection = (direction) => {
    const currentIndex = getSectionIndex(activeSection);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex < sectionWidgets.length - 1 ? currentIndex + 1 : 0;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : sectionWidgets.length - 1;
    }
    
    setActiveSection(sectionWidgets[newIndex].id);
  };

  // Update functions
  const updatePersonalData = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      position: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const updateExperience = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (index) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      degree: '',
      institution: '',
      year: '',
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (index) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    const newSkill = {
      id: Date.now(),
      name: '',
      tools: []
    };
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => 
        i === index ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const updateSkillTools = (index, value) => {
    const tools = value.split(',').map(tool => tool.trim()).filter(tool => tool.length > 0);
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => 
        i === index ? { ...skill, tools } : skill
      )
    }));
  };

  const removeSkill = (index) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: '',
      description: '',
      technologies: '',
      url: ''
    };
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) => 
        i === index ? { ...project, [field]: value } : project
      )
    }));
  };

  const removeProject = (index) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const addCertification = () => {
    const newCert = {
      id: Date.now(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
      url: '',
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCert]
    }));
  };

  const updateCertification = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const removeCertification = (index) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const changePreviewSize = (delta) => {
    const newScale = Math.max(50, Math.min(150, previewScale + delta));
    setPreviewScale(newScale);
  };

  const resetPreviewSize = () => {
    setPreviewScale(100);
  };

  const showNotification = (message, type = 'info') => {
    alert(message);
  };

  // Handle template selection
  const handleTemplateSelect = (templateId) => {
    setCurrentTemplate(templateId);
    setCurrentView('sections');
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-3 lg:py-4 gap-3 lg:gap-0">
            <div className="flex justify-between items-center w-full lg:w-auto">
              {/* Company Logo */}
              <div className="flex items-center space-x-3">
                <div className="h-8 sm:h-10 w-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P.T</span>
                </div>
                <span className="text-lg font-bold text-gray-800">Placed.Today</span>
              </div>
              
              {/* Download button - visible on mobile */}
              <button
                onClick={downloadPDF}
                disabled={isDownloading}
                className="lg:hidden bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-300 text-white px-3 py-2 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center gap-2"
              >
                <Download size={14} />
                <span className="hidden sm:inline">{isDownloading ? 'Generating...' : 'Download'}</span>
              </button>
            </div>
            
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <button 
                onClick={() => setCurrentView('templates')}
                className={`hover:text-indigo-600 transition-colors ${currentView === 'templates' ? 'text-indigo-600 font-medium' : ''}`}
              >
                Templates
              </button>
              {currentView !== 'templates' && (
                <>
                  <span>/</span>
                  <button 
                    onClick={() => setCurrentView('sections')}
                    className={`hover:text-indigo-600 transition-colors ${currentView === 'sections' ? 'text-indigo-600 font-medium' : ''}`}
                  >
                    Sections
                  </button>
                </>
              )}
              {currentView === 'section' && activeSection && (
                <>
                  <span>/</span>
                  <span className="text-indigo-600 font-medium capitalize">{activeSection}</span>
                </>
              )}
            </div>
            
            {/* Download button - desktop only */}
            <button
              onClick={downloadPDF}
              disabled={isDownloading}
              className="hidden lg:flex bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-300 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 items-center gap-2"
            >
              <Download size={16} />
              {isDownloading ? 'Generating PDF...' : 'Download PDF'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Sidebar */}
        <div className={`${isFullscreen ? 'hidden' : 'w-full lg:w-1/2'} bg-white p-3 sm:p-4 lg:p-6 overflow-y-auto`}>
          
          {/* Templates View */}
          {currentView === 'templates' && (
            <div>
              <h4 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 text-gray-800">Choose Your Template</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
                {templates.map(template => (
                  <div
                    key={template.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className={`card cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                      currentTemplate === template.id
                        ? 'border-indigo-500 shadow-xl bg-indigo-50 scale-105'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className={`h-24 ${template.color} rounded-lg mb-3 flex items-center justify-center text-white text-2xl shadow-md`}>
                      {template.icon}
                    </div>
                    <div className="text-center">
                      <h6 className="font-semibold text-gray-800 text-sm mb-1">{template.name}</h6>
                      <small className="text-gray-600 text-xs">{template.desc}</small>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">
                  💡 <strong>Tip:</strong> Select a template to start building your resume. Each template is optimized for different industries and career levels.
                </p>
              </div>
            </div>
          )}

          {/* Sections Overview */}
          {currentView === 'sections' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setCurrentView('templates')}
                  className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <ChevronLeft size={20} />
                  Back to Templates
                </button>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-xl lg:text-2xl font-bold text-gray-800">Resume Sections</h4>
                  <p className="text-gray-600 mt-1">Click on any section to edit its content</p>
                </div>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Template: {templates.find(t => t.id === currentTemplate)?.name}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sectionWidgets.map((section) => {
                  const IconComponent = section.icon;
                  const sectionData = resumeData[section.id];
                  let itemCount = 0;
                  
                  if (section.id === 'personal') {
                    itemCount = Object.values(sectionData).filter(val => val && val.toString().trim()).length;
                  } else if (Array.isArray(sectionData)) {
                    itemCount = sectionData.length;
                  }
                  
                  return (
                    <div
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id);
                        setCurrentView('section');
                      }}
                      className="bg-white border-2 border-gray-200 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:border-indigo-300 hover:shadow-md hover:scale-105 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`${section.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform shadow-md`}>
                          <IconComponent size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">{section.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{section.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {itemCount} {itemCount === 1 ? 'item' : 'items'}
                            </span>
                            <ArrowRight size={14} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-700">
                  ✅ <strong>Quick Start:</strong> Your resume is pre-filled with sample data. Click on any section to customize it with your information.
                </p>
              </div>
            </div>
          )}

          {/* Individual Section Edit */}
          {currentView === 'section' && activeSection && (
            <div>
              {/* Section Header with Navigation */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentView('sections')}
                    className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    <ChevronLeft size={20} />
                    Back
                  </button>
                  <div className="flex items-center gap-3">
                    {React.createElement(getCurrentSectionData()?.icon, { size: 24, className: `${getCurrentSectionData()?.color.replace('bg-', 'text-')}` })}
                    <h4 className="text-xl font-bold text-gray-800 capitalize">{activeSection}</h4>
                  </div>
                </div>
                
                {/* Section Navigation */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateSection('prev')}
                    className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Previous Section"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <span className="text-sm text-gray-500 px-2">
                    {getSectionIndex(activeSection) + 1} of {sectionWidgets.length}
                  </span>
                  <button
                    onClick={() => navigateSection('next')}
                    className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Next Section"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              {/* Personal Information Section */}
              {activeSection === 'personal' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-indigo-500 focus:outline-none transition-colors"
                        value={resumeData.personal.fullName}
                        onChange={(e) => updatePersonalData('fullName', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
                      <input
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-indigo-500 focus:outline-none transition-colors"
                        value={resumeData.personal.professionalTitle}
                        onChange={(e) => updatePersonalData('professionalTitle', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-indigo-500 focus:outline-none transition-colors"
                        value={resumeData.personal.email}
                        onChange={(e) => updatePersonalData('email', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-indigo-500 focus:outline-none transition-colors"
                        value={resumeData.personal.phone}
                        onChange={(e) => updatePersonalData('phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-indigo-500 focus:outline-none transition-colors"
                        value={resumeData.personal.location}
                        onChange={(e) => updatePersonalData('location', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                      <input
                        type="url"
                        className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-indigo-500 focus:outline-none transition-colors"
                        value={resumeData.personal.linkedin}
                        onChange={(e) => updatePersonalData('linkedin', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
                    <HtmlEditor
                      value={resumeData.personal.summary}
                      onChange={(value) => updatePersonalData('summary', value)}
                      placeholder="Write a brief professional summary..."
                      minHeight="120px"
                    />
                  </div>
                </div>
              )}

              {/* Experience Section */}
              {activeSection === 'experience' && (
                <div className="space-y-6">
                  {resumeData.experience.map((exp, index) => (
                    <div key={exp.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h6 className="font-semibold text-gray-800">Experience {index + 1}</h6>
                        <button
                          onClick={() => removeExperience(index)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                          placeholder="Position"
                          value={exp.position}
                          onChange={(e) => updateExperience(index, 'position', e.target.value)}
                        />
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        />
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                          placeholder="Start Date"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                        />
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                          placeholder="End Date"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                        />
                        <div className="col-span-1 sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <HtmlEditor
                            value={exp.description}
                            onChange={(value) => updateExperience(index, 'description', value)}
                            placeholder="Describe your role and achievements..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addExperience}
                    className="w-full bg-indigo-50 border-2 border-dashed border-indigo-300 rounded-lg p-6 text-center hover:bg-indigo-100 transition-colors cursor-pointer group"
                  >
                    <Plus className="mx-auto mb-2 text-indigo-500 group-hover:scale-110 transition-transform" size={24} />
                    <div className="text-indigo-600 font-medium">Add Work Experience</div>
                  </button>
                </div>
              )}

              {/* Education Section */}
              {activeSection === 'education' && (
                <div className="space-y-6">
                  {resumeData.education.map((edu, index) => (
                    <div key={edu.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h6 className="font-semibold text-gray-800">Education {index + 1}</h6>
                        <button
                          onClick={() => removeEducation(index)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                          placeholder="Degree"
                          value={edu.degree}
                          onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                        />
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                          placeholder="Institution"
                          value={edu.institution}
                          onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                        />
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none col-span-1 sm:col-span-2"
                          placeholder="Year"
                          value={edu.year}
                          onChange={(e) => updateEducation(index, 'year', e.target.value)}
                        />
                        <div className="col-span-1 sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description (optional)</label>
                          <HtmlEditor
                            value={edu.description}
                            onChange={(value) => updateEducation(index, 'description', value)}
                            placeholder="Additional details..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addEducation}
                    className="w-full bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg p-6 text-center hover:bg-purple-100 transition-colors cursor-pointer group"
                  >
                    <Plus className="mx-auto mb-2 text-purple-500 group-hover:scale-110 transition-transform" size={24} />
                    <div className="text-purple-600 font-medium">Add Education</div>
                  </button>
                </div>
              )}

              {/* Skills Section */}
              {activeSection === 'skills' && (
                <div className="space-y-6">
                  {resumeData.skills.map((skill, index) => (
                    <div key={skill.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h6 className="font-semibold text-gray-800">Skill {index + 1}</h6>
                        <button
                          onClick={() => removeSkill(index)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                          placeholder="Skill Category (e.g., Frontend Development)"
                          value={skill.name}
                          onChange={(e) => updateSkill(index, 'name', e.target.value)}
                        />
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Tools/Technologies (comma separated)</label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                            placeholder="e.g., React, Node.js, Express, MongoDB"
                            value={skill.tools ? skill.tools.join(', ') : ''}
                            onChange={(e) => updateSkillTools(index, e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addSkill}
                    className="w-full bg-orange-50 border-2 border-dashed border-orange-300 rounded-lg p-6 text-center hover:bg-orange-100 transition-colors cursor-pointer group"
                  >
                    <Plus className="mx-auto mb-2 text-orange-500 group-hover:scale-110 transition-transform" size={24} />
                    <div className="text-orange-600 font-medium">Add Skill</div>
                  </button>
                </div>
              )}

              {/* Projects Section */}
              {activeSection === 'projects' && (
                <div className="space-y-6">
                  {resumeData.projects.map((project, index) => (
                    <div key={project.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h6 className="font-semibold text-gray-800">Project {index + 1}</h6>
                        <button
                          onClick={() => removeProject(index)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                          placeholder="Project Name"
                          value={project.name}
                          onChange={(e) => updateProject(index, 'name', e.target.value)}
                        />
                        <input
                          type="url"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                          placeholder="Project URL"
                          value={project.url}
                          onChange={(e) => updateProject(index, 'url', e.target.value)}
                        />
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none col-span-1 sm:col-span-2"
                          placeholder="Technologies Used"
                          value={project.technologies}
                          onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                        />
                        <div className="col-span-1 sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
                          <HtmlEditor
                            value={project.description}
                            onChange={(value) => updateProject(index, 'description', value)}
                            placeholder="Describe the project..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addProject}
                    className="w-full bg-cyan-50 border-2 border-dashed border-cyan-300 rounded-lg p-6 text-center hover:bg-cyan-100 transition-colors cursor-pointer group"
                  >
                    <Plus className="mx-auto mb-2 text-cyan-500 group-hover:scale-110 transition-transform" size={24} />
                    <div className="text-cyan-600 font-medium">Add Project</div>
                  </button>
                </div>
              )}

              {/* Certifications Section */}
              {activeSection === 'certifications' && (
                <div className="space-y-6">
                  {resumeData.certifications.map((cert, index) => (
                    <div key={cert.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h6 className="font-semibold text-gray-800">Certification {index + 1}</h6>
                        <button
                          onClick={() => removeCertification(index)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                          placeholder="Certification Name"
                          value={cert.name}
                          onChange={(e) => updateCertification(index, 'name', e.target.value)}
                        />
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                          placeholder="Issuing Organization"
                          value={cert.issuer}
                          onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                        />
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                          placeholder="Issue Date"
                          value={cert.date}
                          onChange={(e) => updateCertification(index, 'date', e.target.value)}
                        />
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                          placeholder="Expiry Date (optional)"
                          value={cert.expiryDate}
                          onChange={(e) => updateCertification(index, 'expiryDate', e.target.value)}
                        />
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                          placeholder="Credential ID (optional)"
                          value={cert.credentialId}
                          onChange={(e) => updateCertification(index, 'credentialId', e.target.value)}
                        />
                        <input
                          type="url"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                          placeholder="Credential URL (optional)"
                          value={cert.url}
                          onChange={(e) => updateCertification(index, 'url', e.target.value)}
                        />
                        <div className="col-span-1 sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description (optional)</label>
                          <HtmlEditor
                            value={cert.description}
                            onChange={(value) => updateCertification(index, 'description', value)}
                            placeholder="Additional details..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addCertification}
                    className="w-full bg-red-50 border-2 border-dashed border-red-300 rounded-lg p-6 text-center hover:bg-red-100 transition-colors cursor-pointer group"
                  >
                    <Plus className="mx-auto mb-2 text-red-500 group-hover:scale-110 transition-transform" size={24} />
                    <div className="text-red-600 font-medium">Add Certification</div>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Preview Panel */}
        <div className={`${isFullscreen ? 'w-full' : 'w-full lg:w-1/2'} bg-white border-t lg:border-t-0 lg:border-l border-gray-200`}>
          <div className="sticky top-0 bg-gray-50 border-b p-3 lg:p-4 z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
              <h5 className="text-base lg:text-lg font-semibold text-gray-800 flex items-center">
                <Eye className="mr-2 text-indigo-500" size={18} />
                Live Preview
                {currentView !== 'templates' && (
                  <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                    {templates.find(t => t.id === currentTemplate)?.name}
                  </span>
                )}
              </h5>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => changePreviewSize(-10)}
                    className="bg-white border border-gray-300 rounded w-8 h-8 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors"
                    title="Decrease size"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm text-gray-600 min-w-[40px] text-center">{previewScale}%</span>
                  <button
                    onClick={() => changePreviewSize(10)}
                    className="bg-white border border-gray-300 rounded w-8 h-8 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors"
                    title="Increase size"
                  >
                    <Plus size={12} />
                  </button>
                  <button
                    onClick={resetPreviewSize}
                    className="bg-white border border-gray-300 rounded w-8 h-8 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors"
                    title="Reset size"
                  >
                    <RotateCcw size={12} />
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="bg-white border border-gray-300 rounded px-3 py-1 text-sm hover:bg-indigo-500 hover:text-white transition-colors"
                    title="Toggle Fullscreen"
                  >
                    <Maximize2 size={14} />
                  </button>
                  <button
                    onClick={() => showNotification('Preview refreshed!', 'info')}
                    className="bg-white border border-gray-300 rounded px-3 py-1 text-sm hover:bg-indigo-500 hover:text-white transition-colors"
                    title="Refresh Preview"
                  >
                    <RefreshCw size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 lg:p-6 h-full overflow-y-auto">
            {currentView === 'templates' ? (
              <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">📄</div>
                  <h3 className="text-lg font-medium mb-2">Select a Template</h3>
                  <p className="text-sm">Choose a template from the left to start building your resume</p>
                  <p className="text-xs text-gray-400 mt-2">5 professional templates available</p>
                </div>
              </div>
            ) : (
              <div 
                className="resume-preview bg-white min-h-[400px] lg:min-h-[600px] p-3 lg:p-5 rounded-lg shadow-lg transition-transform origin-top-left"
                style={{ 
                  transform: `scale(${previewScale / 100})`,
                  transformOrigin: 'top left'
                }}
              >
                {renderTemplate()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isDownloading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
            <p className="text-gray-700">Generating your PDF resume...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;