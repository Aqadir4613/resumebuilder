import React, { useState, useEffect, useRef } from 'react';
import { Download, Eye, Plus, Minus, RotateCcw, Maximize2, RefreshCw, X, Bold, Italic, Underline, List, ListOrdered, Type, ArrowLeft, ArrowRight, ChevronLeft, Edit3, User, Briefcase, GraduationCap, Settings, FolderOpen, Award } from 'lucide-react';

const ResumeBuilder = () => {
  const [currentTemplate, setCurrentTemplate] = useState(1);
  const [previewScale, setPreviewScale] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentView, setCurrentView] = useState('templates'); // templates, sections, or specific section
  const [activeSection, setActiveSection] = useState(null);
  const [editMode, setEditMode] = useState(false);
  
  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: 'John Doe',
      professionalTitle: 'Software Developer',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/johndoe',
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
  const ModernTemplate = ({ data, editMode = false, onEdit }) => (
    <div className="template-modern text-xs leading-snug">
      <div className="header bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 text-center -m-5 mb-5 relative">
        {editMode && (
          <button
            onClick={() => onEdit('personal')}
            className="absolute top-2 right-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-lg transition-colors"
          >
            <Edit3 size={14} />
          </button>
        )}
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
            <div className="section mb-6 relative">
              {editMode && (
                <button
                  onClick={() => onEdit('personal')}
                  className="absolute top-0 right-0 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 p-1 rounded transition-colors"
                >
                  <Edit3 size={12} />
                </button>
              )}
              <h3 className="text-indigo-500 text-base mb-4 border-b-2 border-indigo-500 pb-1">Professional Summary</h3>
              <div className="text-xs" dangerouslySetInnerHTML={{ __html: data.personal.summary }} />
            </div>
          )}
          
          {data.experience.length > 0 && (
            <div className="section mb-6 relative">
              {editMode && (
                <button
                  onClick={() => onEdit('experience')}
                  className="absolute top-0 right-0 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 p-1 rounded transition-colors"
                >
                  <Edit3 size={12} />
                </button>
              )}
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
            <div className="section mb-6 relative">
              {editMode && (
                <button
                  onClick={() => onEdit('education')}
                  className="absolute top-0 right-0 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 p-1 rounded transition-colors"
                >
                  <Edit3 size={12} />
                </button>
              )}
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
            <div className="section mb-6 relative">
              {editMode && (
                <button
                  onClick={() => onEdit('skills')}
                  className="absolute top-0 right-0 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 p-1 rounded transition-colors"
                >
                  <Edit3 size={12} />
                </button>
              )}
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
            <div className="section mb-6 relative">
              {editMode && (
                <button
                  onClick={() => onEdit('projects')}
                  className="absolute top-0 right-0 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 p-1 rounded transition-colors"
                >
                  <Edit3 size={12} />
                </button>
              )}
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
            <div className="section mb-6 relative">
              {editMode && (
                <button
                  onClick={() => onEdit('certifications')}
                  className="absolute top-0 right-0 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 p-1 rounded transition-colors"
                >
                  <Edit3 size={12} />
                </button>
              )}
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

  // Similar templates for Classic, Creative, Minimalist (shortened for brevity)
  const ClassicTemplate = ({ data, editMode = false, onEdit }) => (
    <div className="template-classic text-xs leading-snug">
      <div className="header text-center border-b-2 border-gray-800 pb-5 mb-8 relative">
        {editMode && (
          <button
            onClick={() => onEdit('personal')}
            className="absolute top-2 right-2 bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg transition-colors"
          >
            <Edit3 size={14} />
          </button>
        )}
        <h1 className="text-3xl text-gray-800 mb-3 font-bold">{data.personal.fullName || 'Your Name'}</h1>
        <div className="text-sm">{[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join(' | ')}</div>
      </div>
      
      {data.personal.summary && (
        <div className="section mb-8 relative">
          {editMode && (
            <button
              onClick={() => onEdit('personal')}
              className="absolute top-0 right-0 bg-gray-100 hover:bg-gray-200 text-gray-600 p-1 rounded transition-colors"
            >
              <Edit3 size={12} />
            </button>
          )}
          <h3 className="text-gray-800 text-lg mb-3 uppercase tracking-wide border-b border-gray-400 pb-1">Professional Summary</h3>
          <div className="text-xs" dangerouslySetInnerHTML={{ __html: data.personal.summary }} />
        </div>
      )}
      
      {/* Other sections with similar edit buttons */}
    </div>
  );

  const renderTemplate = () => {
    const templateProps = {
      data: resumeData,
      editMode: editMode,
      onEdit: (section) => {
        setActiveSection(section);
        setCurrentView('section');
      }
    };

    switch(currentTemplate) {
      case 1: return <ModernTemplate {...templateProps} />;
      case 2: return <ClassicTemplate {...templateProps} />;
      case 3: return <ModernTemplate {...templateProps} />; // Simplified - use Creative template
      case 4: return <ModernTemplate {...templateProps} />; // Simplified - use Minimalist template
      default: return <ModernTemplate {...templateProps} />;
    }
  };

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

  // Similar functions for other sections (education, skills, projects, certifications)
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

  const downloadPDF = () => {
    window.print();
  };

  const showNotification = (message, type = 'info') => {
    alert(message);
  };

  // Handle template selection
  const handleTemplateSelect = (templateId) => {
    setCurrentTemplate(templateId);
    setCurrentView('sections');
    setEditMode(true);
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
                <img
                  src="/logo_color.webp"
                  alt="Placed.Today"
                  className="h-8 sm:h-10 w-auto rounded-lg shadow-md object-contain"
                />
              </div>
              
              {/* Download button - visible on mobile */}
              <button
                onClick={downloadPDF}
                className="lg:hidden bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-2 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center gap-2"
              >
                <Download size={14} />
                <span className="hidden sm:inline">Download</span>
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
              className="hidden lg:flex bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 items-center gap-2"
            >
              <Download size={16} />
              Download PDF
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                {[
                  { id: 1, name: 'Modern', desc: 'Professional & Eye-catching' },
                  { id: 2, name: 'Classic', desc: 'Traditional & Clean' },
                  { id: 3, name: 'Creative', desc: 'Colorful & Unique' },
                  { id: 4, name: 'Minimalist', desc: 'Simple & Elegant' }
                ].map(template => (
                  <div
                    key={template.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className={`card cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 hover:shadow-lg ${
                      currentTemplate === template.id
                        ? 'border-indigo-500 shadow-xl bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-4xl">📄</span>
                    </div>
                    <div className="text-center">
                      <h6 className="font-semibold text-gray-800">{template.name}</h6>
                      <small className="text-gray-600">{template.desc}</small>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">
                  💡 <strong>Tip:</strong> Select a template to start building your resume. You can customize each section and edit content directly on the preview.
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
              
              <h4 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 text-gray-800">Resume Sections</h4>
              <p className="text-gray-600 mb-6">Click on any section to edit its content. You can also edit directly on the resume preview.</p>
              
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
                      className="bg-white border-2 border-gray-200 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:border-indigo-300 hover:shadow-md group"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`${section.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}>
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
                          className="text-red-500 hover:text-red-700 transition-colors"
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
                    className="w-full bg-indigo-50 border-2 border-dashed border-indigo-300 rounded-lg p-6 text-center hover:bg-indigo-100 transition-colors cursor-pointer"
                  >
                    <Plus className="mx-auto mb-2 text-indigo-500" size={24} />
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
                          className="text-red-500 hover:text-red-700 transition-colors"
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
                    className="w-full bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg p-6 text-center hover:bg-purple-100 transition-colors cursor-pointer"
                  >
                    <Plus className="mx-auto mb-2 text-purple-500" size={24} />
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
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                          placeholder="Skill Name (e.g., JavaScript)"
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
                    className="w-full bg-orange-50 border-2 border-dashed border-orange-300 rounded-lg p-6 text-center hover:bg-orange-100 transition-colors cursor-pointer"
                  >
                    <Plus className="mx-auto mb-2 text-orange-500" size={24} />
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
                          className="text-red-500 hover:text-red-700 transition-colors"
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
                    className="w-full bg-cyan-50 border-2 border-dashed border-cyan-300 rounded-lg p-6 text-center hover:bg-cyan-100 transition-colors cursor-pointer"
                  >
                    <Plus className="mx-auto mb-2 text-cyan-500" size={24} />
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
                          className="text-red-500 hover:text-red-700 transition-colors"
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
                    className="w-full bg-red-50 border-2 border-dashed border-red-300 rounded-lg p-6 text-center hover:bg-red-100 transition-colors cursor-pointer"
                  >
                    <Plus className="mx-auto mb-2 text-red-500" size={24} />
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
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className={`ml-4 px-3 py-1 text-xs rounded-full transition-colors ${
                      editMode 
                        ? 'bg-green-100 text-green-700 border border-green-300' 
                        : 'bg-gray-100 text-gray-600 border border-gray-300'
                    }`}
                  >
                    {editMode ? '✏️ Edit Mode' : '👁️ View Mode'}
                  </button>
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
                </div>
              </div>
            ) : (
              <div 
                className="resume-preview bg-white min-h-[400px] lg:min-h-[600px] p-3 lg:p-5 rounded-lg shadow-lg transition-transform"
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
    </div>
  );
};

export default ResumeBuilder;