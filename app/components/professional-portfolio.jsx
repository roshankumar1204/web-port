import React from "react";
import Image from "next/image";
import { personalData } from "@/utils/data/personal-data";
import { experiences } from "@/utils/data/experience";
import { educations } from "@/utils/data/educations";
import { skillsData } from "@/utils/data/skills";
import { projectsData } from "@/utils/data/projects-data";

const ProfessionalPortfolio = () => {
  return (
    <section className="max-w-5xl mx-auto py-12 px-6 bg-white">
      {/* Navbar */}
      <nav className="mb-8">
        <div className="flex items-center justify-between py-5 border-b border-gray-200">
          <div className="flex flex-shrink-0 items-center">
            <span className="text-gray-900 text-2xl font-bold">Roshan Kumar</span>
          </div>
          <ul className="flex flex-row space-x-1">
            <li>
              <a className="block px-4 py-2 no-underline outline-none hover:no-underline" href="#about">
                <div className="text-sm text-gray-700 transition-colors duration-300 hover:text-gray-900 font-medium">ABOUT</div>
              </a>
            </li>
            <li>
              <a className="block px-4 py-2 no-underline outline-none hover:no-underline" href="#experience">
                <div className="text-sm text-gray-700 transition-colors duration-300 hover:text-gray-900 font-medium">EXPERIENCE</div>
              </a>
            </li>
            <li>
              <a className="block px-4 py-2 no-underline outline-none hover:no-underline" href="#skills">
                <div className="text-sm text-gray-700 transition-colors duration-300 hover:text-gray-900 font-medium">SKILLS</div>
              </a>
            </li>
            <li>
              <a className="block px-4 py-2 no-underline outline-none hover:no-underline" href="#education">
                <div className="text-sm text-gray-700 transition-colors duration-300 hover:text-gray-900 font-medium">EDUCATION</div>
              </a>
            </li>
            <li>
              <a className="block px-4 py-2 no-underline outline-none hover:no-underline" href="#projects">
                <div className="text-sm text-gray-700 transition-colors duration-300 hover:text-gray-900 font-medium">PROJECTS</div>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      
      {/* Header with Image */}
      <header id="about" className="mb-16 flex flex-col md:flex-row items-center gap-10 pb-10 border-b border-gray-300">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-800 shadow-lg">
          <Image
            src={personalData.profile}
            alt={personalData.name}
            width={128}
            height={128}
            className="object-cover"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{personalData.name}</h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium mb-4">{personalData.designation}</p>
          <div className="flex gap-4 justify-center md:justify-start">
            <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:text-gray-900 underline">GitHub</a>
            <a href={personalData.linkedIn} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:text-gray-900 underline">LinkedIn</a>
            <a href={personalData.resume} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:text-gray-900 underline">Resume</a>
          </div>
        </div>
      </header>

      {/* About */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2 inline-block">About</h2>
        <p className="text-gray-700 leading-relaxed text-base">
          {personalData.description}
        </p>
      </div>

      {/* Experience */}
      <div id="experience" className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2 inline-block">Experience</h2>
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="border-l-2 border-gray-800 pl-4">
              <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
              <p className="text-gray-600 text-sm">{exp.company}</p>
              <p className="text-gray-500 text-sm mt-1">{exp.duration}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div id="education" className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2 inline-block">Education</h2>
        <div className="space-y-6">
          {educations.map((edu) => (
            <div key={edu.id} className="border-l-2 border-gray-800 pl-4">
              <h3 className="text-lg font-semibold text-gray-900">{edu.title}</h3>
              <p className="text-gray-600 text-sm">{edu.institution}</p>
              <p className="text-gray-500 text-sm mt-1">{edu.duration}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div id="projects" className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2 inline-block">Projects</h2>
        <div className="space-y-8">
          {projectsData.map((project) => (
            <div key={project.id} className="border border-gray-300 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
                {project.demo && (
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-gray-700 hover:text-gray-900 underline"
                  >
                    View Demo
                  </a>
                )}
              </div>
              <p className="text-gray-700 text-sm mb-3 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tools.map((tool, idx) => (
                  <span key={idx} className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-xs font-medium">
                    {tool}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 text-sm italic">{project.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div id="skills" className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2 inline-block">Technical Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skillsData.map((skill, idx) => (
            <span key={idx} className="bg-gray-200 text-gray-800 px-3 py-1.5 rounded text-sm font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="border-t border-gray-300 pt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact</h2>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Email: </span>
            <a href={`mailto:${personalData.email}`} className="text-gray-700 hover:text-gray-900 underline">{personalData.email}</a>
          </p>
          <p>
            <span className="font-semibold">Phone: </span>
            <span>{personalData.phone}</span>
          </p>
          <p>
            <span className="font-semibold">Location: </span>
            <span>{personalData.address}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalPortfolio;
