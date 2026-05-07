import Icon from './Icon';

export function FormSection({ num, title, desc, children }) {
  return (
    <div className="form-section">
      <div className="fs-head">
        <span className="fs-num">{num}</span>
        <div>
          <div className="fs-title">{title}</div>
          {desc && <div className="fs-desc">{desc}</div>}
        </div>
      </div>
      <div className="fs-body">{children}</div>
    </div>
  );
}

export function Field({ label, hint, span, required, children }) {
  return (
    <div className="field" style={span ? { gridColumn: `span ${span}` } : undefined}>
      <label>
        {label}
        {required && <span style={{ color: 'var(--c-sos)', marginLeft: 4 }}>*</span>}
      </label>
      {children}
      {hint && <div className="fhint">{hint}</div>}
    </div>
  );
}

export function CheckTile({ icon, label, desc, checked, onChange }) {
  return (
    <button type="button"
            className={"check-tile " + (checked ? 'checked' : '')}
            onClick={() => onChange(!checked)}>
      <span className="ct-icn">{icon}</span>
      <span className="ct-text">
        <span className="ct-label">{label}</span>
        {desc && <span className="ct-desc">{desc}</span>}
      </span>
      <span className="ct-check">{checked && <Icon name="check" size={14}/>}</span>
    </button>
  );
}

export function Toggle({ value, onChange }) {
  return (
    <button type="button"
            className={"tgl " + (value ? 'on' : '')}
            onClick={() => onChange(!value)}>
      <span className="tgl-knob"></span>
    </button>
  );
}
