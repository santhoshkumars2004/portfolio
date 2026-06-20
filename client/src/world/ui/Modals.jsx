import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaFilePdf } from 'react-icons/fa';
import { useGame, actions } from '../store/gameStore';
import { RESUME, LINKS } from '../config';

function Backdrop({ children }) {
  return (
    <motion.div
      className="wl-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => actions.closeModal()}
    >
      <motion.div
        className="wl-modal"
        initial={{ opacity: 0, y: 26, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="wl-modal__close" onClick={() => actions.closeModal()} aria-label="Close">
          ✕
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}

function ResumeBody() {
  return (
    <div>
      <h2 className="wl-resume__name">{RESUME.name}</h2>
      <p className="wl-resume__role">{RESUME.role}</p>
      <p className="wl-resume__blurb">{RESUME.blurb}</p>

      <div className="wl-sec">
        <div className="wl-sec__title">Education</div>
        <div className="wl-edu__school">{RESUME.education.school}</div>
        <div className="wl-edu__meta">
          {RESUME.education.degree} · CGPA {RESUME.education.cgpa}
        </div>
      </div>

      <div className="wl-sec">
        <div className="wl-sec__title">Experience</div>
        {RESUME.experience.map((e) => (
          <div key={e.org} style={{ marginBottom: '0.8rem' }}>
            <div className="wl-exp__org">
              {e.title} · {e.org}
            </div>
            <div className="wl-exp__meta">{e.period}</div>
            <ul className="wl-exp__points">
              {e.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="wl-sec">
        <div className="wl-sec__title">Skills</div>
        <div className="wl-chips">
          {RESUME.skills.map((s) => (
            <span key={s} className="wl-chip">
              {s}
            </span>
          ))}
        </div>
      </div>

      <a className="wl-dl" href={LINKS.resume} download>
        <FaFilePdf /> Download résumé (PDF)
      </a>
    </div>
  );
}

function ProjectBody({ data }) {
  if (!data) return null;
  return (
    <div>
      <div className="wl-proj__emoji">{data.emoji}</div>
      <h2 className="wl-proj__title">{data.title}</h2>
      <div className="wl-proj__tag">{data.tag}</div>
      <div className="wl-proj__body">
        {data.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="wl-sec">
        <div className="wl-sec__title">Stack</div>
        <div className="wl-chips">
          {data.stack.map((s) => (
            <span key={s} className="wl-chip">
              {s}
            </span>
          ))}
        </div>
      </div>
      {data.link && (
        <a className="wl-proj__link" href={data.link} target="_blank" rel="noreferrer">
          <FaGithub /> View on GitHub
        </a>
      )}
    </div>
  );
}

function ContactBody() {
  const copyEmail = () => {
    const email = LINKS.email;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(
        () => actions.toast('Email copied ✓'),
        () => actions.toast(email)
      );
    } else {
      actions.toast(email);
    }
  };
  return (
    <div className="wl-contact">
      <div className="wl-contact__kicker">Paper plane · for you</div>
      <h2 className="wl-contact__title">Let's build something.</h2>
      <p className="wl-contact__sub">
        Open to LLM / backend & AI engineering roles. The inbox is always open — say hi.
      </p>
      <div className="wl-contact__grid">
        <button className="wl-contact__btn" onClick={copyEmail}>
          <FaEnvelope /> {LINKS.email} <small>copy</small>
        </button>
        <a className="wl-contact__btn" href={LINKS.github} target="_blank" rel="noreferrer">
          <FaGithub /> GitHub <small>@santhoshkumars2004</small>
        </a>
        <a className="wl-contact__btn" href={LINKS.linkedin} target="_blank" rel="noreferrer">
          <FaLinkedin /> LinkedIn <small>connect</small>
        </a>
        <a className="wl-contact__btn" href={LINKS.resume} download>
          <FaFilePdf /> Résumé <small>download</small>
        </a>
      </div>
    </div>
  );
}

/**
 * Modals — DOM overlay host driven by the game store. Renders the résumé,
 * project, or contact card depending on store.modal.type. Esc or backdrop close.
 */
export default function Modals() {
  const modal = useGame((s) => s.modal);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') actions.closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <AnimatePresence>
      {modal && (
        <Backdrop key={modal.type}>
          {modal.type === 'resume' && <ResumeBody />}
          {modal.type === 'project' && <ProjectBody data={modal.data} />}
          {modal.type === 'contact' && <ContactBody />}
        </Backdrop>
      )}
    </AnimatePresence>
  );
}
