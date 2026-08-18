import { useState, useEffect } from "react";
import { Power, PowerOff, Loader2, AlertCircle, LogOut, Eye, EyeOff } from "lucide-react";

const API_BASE = "/api";

function getOwnerToken() {
  return sessionStorage.getItem("owner_token");
}
function setOwnerToken(t: string) {
  sessionStorage.setItem("owner_token", t);
}
function clearOwnerToken() {
  sessionStorage.removeItem("owner_token");
}

export default function OwnerControl() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = getOwnerToken();
    if (!token) { setChecking(false); return; }
    fetch(`${API_BASE}/owner-control/status`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => { setAuthed(r.ok); setChecking(false); })
      .catch(() => setChecking(false));
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-[hsl(210,20%,6%)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[hsl(199,89%,48%)] animate-spin" />
      </div>
    );
  }

  if (!authed) {
    return <OwnerLogin onLogin={() => setAuthed(true)} />;
  }
  return <OwnerDashboard onLogout={() => { clearOwnerToken(); setAuthed(false); }} />;
}

function OwnerLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/owner-control/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json() as { token?: string; error?: string };
      if (!res.ok) {
        setError(data.error || "Authentication failed");
        return;
      }
      setOwnerToken(data.token!);
      onLogin();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(210,20%,6%)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[hsl(199,89%,48%)]/10 border border-[hsl(199,89%,48%)]/20 flex items-center justify-center mx-auto mb-4">
            <Power size={20} className="text-[hsl(199,89%,60%)]" />
          </div>
          <h1 className="text-white text-xl font-bold">System Control</h1>
          <p className="text-[hsl(210,10%,40%)] text-sm mt-1">Restricted access</p>
        </div>

        <div className="bg-[hsl(210,18%,10%)] border border-[hsl(210,15%,16%)] rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[hsl(210,10%,60%)] text-xs font-semibold mb-2 uppercase tracking-wide">
                Username
              </label>
              <input
                type="text"
                required
                autoComplete="off"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-[hsl(210,20%,7%)] border border-[hsl(210,15%,18%)] rounded-lg text-white placeholder-[hsl(210,10%,25%)] text-sm focus:outline-none focus:border-[hsl(199,89%,48%)] transition-colors"
                placeholder="Username"
              />
            </div>
            <div>
              <label className="block text-[hsl(210,10%,60%)] text-xs font-semibold mb-2 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-11 bg-[hsl(210,20%,7%)] border border-[hsl(210,15%,18%)] rounded-lg text-white placeholder-[hsl(210,10%,25%)] text-sm focus:outline-none focus:border-[hsl(199,89%,48%)] transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(210,10%,40%)] hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                <AlertCircle size={15} className="flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[hsl(199,89%,48%)] hover:bg-[hsl(199,89%,42%)] text-white font-semibold text-sm rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
            >
              {loading ? <><Loader2 size={15} className="animate-spin" /> Authenticating...</> : "Authenticate"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function OwnerDashboard({ onLogout }: { onLogout: () => void }) {
  const [paused, setPaused] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(false);
  const [error, setError] = useState("");

  const ownerHeaders = () => ({
    Authorization: `Bearer ${getOwnerToken()}`,
    "Content-Type": "application/json",
  });

  const fetchStatus = async () => {
    try {
      const res = await fetch(`${API_BASE}/owner-control/status`, { headers: ownerHeaders() });
      if (!res.ok) { onLogout(); return; }
      const data = await res.json() as { paused: boolean };
      setPaused(data.paused);
    } catch {
      setError("Failed to load status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStatus(); }, []);

  const handleToggle = async () => {
    setActing(true);
    setError("");
    try {
      const endpoint = paused ? "restore" : "pause";
      const res = await fetch(`${API_BASE}/owner-control/${endpoint}`, {
        method: "POST",
        headers: ownerHeaders(),
      });
      if (!res.ok) {
        const data = await res.json() as { error?: string };
        throw new Error(data.error || "Action failed");
      }
      const data = await res.json() as { paused: boolean };
      setPaused(data.paused);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Action failed");
    } finally {
      setActing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(210,20%,6%)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[hsl(199,89%,48%)] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(210,20%,6%)] flex flex-col">
      {/* Header */}
      <div className="border-b border-[hsl(210,15%,12%)] bg-[hsl(210,18%,8%)]">
        <div className="max-w-lg mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Power size={16} className="text-[hsl(199,89%,60%)]" />
            <span className="text-[hsl(210,10%,60%)] text-sm font-semibold tracking-wide">System Control</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[hsl(210,15%,18%)] text-[hsl(210,10%,45%)] hover:text-white hover:border-[hsl(210,15%,28%)] rounded-lg text-xs transition-colors"
          >
            <LogOut size={13} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          {/* Status indicator */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8 ${
            paused
              ? "bg-red-500/10 border border-red-500/30 text-red-400"
              : "bg-green-500/10 border border-green-500/30 text-green-400"
          }`}>
            <div className={`w-2 h-2 rounded-full ${paused ? "bg-red-400" : "bg-green-400"} animate-pulse`} />
            {paused ? "Website Paused" : "Website Live"}
          </div>

          {/* Toggle button */}
          <button
            onClick={handleToggle}
            disabled={acting || paused === null}
            className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all disabled:opacity-60 shadow-lg ${
              paused
                ? "bg-green-600 hover:bg-green-500 text-white shadow-green-900/30"
                : "bg-red-600 hover:bg-red-500 text-white shadow-red-900/30"
            }`}
          >
            {acting ? (
              <><Loader2 size={22} className="animate-spin" /> {paused ? "Restoring..." : "Pausing..."}</>
            ) : paused ? (
              <><Power size={22} /> Restore Website</>
            ) : (
              <><PowerOff size={22} /> Pause Website</>
            )}
          </button>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 mt-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              <AlertCircle size={15} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <p className="text-[hsl(210,10%,35%)] text-xs mt-6 leading-relaxed">
            {paused
              ? "All public pages are currently blocked. Click Restore to bring the site back online."
              : "Pausing will block all public pages and return HTTP 503 to all visitors."}
          </p>
        </div>
      </div>
    </div>
  );
}
