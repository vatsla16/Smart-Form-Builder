import React, { useState } from "react";
import PropTypes from "prop-types";

const AxeA11yCheck = ({ disabled }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runAxe = async () => {
    if (disabled) return;
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const axe = await import("axe-core");
      // Only check the form canvas (preview)
      const formNode = document.getElementById("form-canvas");
      if (!formNode) {
        setError("Form preview not found.");
        setLoading(false);
        return;
      }
      axe.run(
        formNode,
        {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
        },
        (err, res) => {
          setLoading(false);
          if (err) {
            setError("axe-core error: " + err.message);
            return;
          }
          setResults(res);
        }
      );
    } catch (e) {
      setError("axe-core could not be loaded. Please install it with 'npm install axe-core'.");
      setLoading(false);
    }
    setModalOpen(true);
  };

  // Score: 100 - (violations/total rules * 100)
  const getScore = (res) => {
    if (!res) return null;
    const total = res.passes.length + res.violations.length;
    if (total === 0) return 100;
    return Math.round(100 - (res.violations.length / total) * 100);
  };

  return (
    <>
      <button
        className="btn btn-outline-success btn-lg rounded-pill px-4"
        onClick={runAxe}
        type="button"
        style={{ minWidth: 120 }}
        disabled={disabled}
        aria-disabled={disabled}
      >
        Full Scan
      </button>
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              maxWidth: 600,
              width: "90%",
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: "0 2px 16px #0002",
              padding: 24,
              position: "relative",
            }}
          >
            <button
              style={{
                position: "absolute",
                top: 12,
                right: 16,
                border: "none",
                background: "none",
                fontSize: 24,
                cursor: "pointer",
              }}
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h4>Axe Accessibility Scan</h4>
            {loading && <div>Running axe scan...</div>}
            {error && <div className="text-danger">{error}</div>}
            {results && (
              <>
                <div style={{ marginBottom: 12 }}>
                  <strong>Score:</strong> {getScore(results)} / 100
                </div>
                <div style={{ marginBottom: 12 }}>
                  <strong>Violations:</strong> {results.violations.length}
                  <br />
                  <strong>Passes:</strong> {results.passes.length}
                </div>
                {results.violations.length === 0 ? (
                  <div className="text-success">No accessibility violations found! 🎉</div>
                ) : (
                  <div>
                    <h5>Issues</h5>
                    <ul style={{ paddingLeft: 18 }}>
                      {results.violations.map((v, i) => (
                        <li key={i} style={{ marginBottom: 8 }}>
                          <strong>{v.help}</strong> <br />
                          <span style={{ color: "#dc3545" }}>{v.description}</span>
                          <ul>
                            {v.nodes.map((n, j) => (
                              <li key={j} style={{ fontSize: 13 }}>
                                <code>{n.target.join(", ")}</code>
                                {n.failureSummary && (
                                  <div style={{ color: "#555" }}>{n.failureSummary}</div>
                                )}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

AxeA11yCheck.propTypes = {
  disabled: PropTypes.bool,
};

export default AxeA11yCheck;
