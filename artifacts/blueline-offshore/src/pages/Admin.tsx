import { useState, useEffect, useRef } from "react";
import { LogOut, Upload, Save, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

const API_BASE = "/api";

interface SiteSettings {
  id: number;
  ceoName: string;
  ceoImageUrl: string;
  phone: string;
  hqAddress: string;
  hqCity: string;
}

function getToken() {
  return localStorage.getItem("admin_token");
}
function setToken(t: string) {
  localStorage.setItem("admin_token", t);
}
function clearToken() {
  localStorage.removeItem("admin_token");
}

function authHeaders() {
  return { Authorization: `Bearer ${getToken()}`, "Content-Type": "application/json" };
}

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) { setChecking(false); return; }
    fetch(`${API_BASE}/admin/settings`, { headers: { Authorization: `Bearer ${token}` } })
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

  if (!authed) return <LoginPage onLogin={() => setAuthed(true)} />;
  return <Dashboard onLogout={() => { clearToken(); setAuthed(false); }} />;
}

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json() as { token?: string; error?: string };
      if (!res.ok) { setError(data.error || "Login failed"); return; }
      setToken(data.token!);
      onLogin();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(210,20%,6%)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[hsl(199,89%,48%)]" />
            <span className="text-[hsl(199,89%,60%)] text-xs font-semibold tracking-[0.2em] uppercase">Admin</span>
            <div className="h-px w-8 bg-[hsl(199,89%,48%)]" />
          </div>
          <h1 className="text-white text-3xl font-bold">Blueline Offshore</h1>
          <p className="text-[hsl(210,10%,55%)] text-sm mt-2">Sign in to manage site content</p>
        </div>

        <div className="bg-[hsl(210,18%,10%)] border border-[hsl(210,15%,16%)] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[hsl(210,10%,65%)] text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[hsl(210,20%,7%)] border border-[hsl(210,15%,18%)] rounded-lg text-white placeholder-[hsl(210,10%,30%)] text-sm focus:outline-none focus:border-[hsl(199,89%,48%)] transition-colors"
                placeholder="admin@bluelineoffshore.com"
              />
            </div>
            <div>
              <label className="block text-[hsl(210,10%,65%)] text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-[hsl(210,20%,7%)] border border-[hsl(210,15%,18%)] rounded-lg text-white placeholder-[hsl(210,10%,30%)] text-sm focus:outline-none focus:border-[hsl(199,89%,48%)] transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(210,10%,45%)] hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                <AlertCircle size={16} className="flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[hsl(199,89%,48%)] hover:bg-[hsl(199,89%,42%)] text-white font-semibold text-sm rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [form, setForm] = useState({ ceoName: "", phone: "", hqAddress: "", hqCity: "" });
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`${API_BASE}/admin/settings`, { headers: authHeaders() })
      .then(r => r.json())
      .then((data: SiteSettings) => {
        setSettings(data);
        setForm({ ceoName: data.ceoName, phone: data.phone, hqAddress: data.hqAddress, hqCity: data.hqCity });
        setImagePreview(data.ceoImageUrl);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    try {
      let finalImageUrl = settings?.ceoImageUrl;

      if (imageFile) {
        const fd = new FormData();
        fd.append("image", imageFile);
        const uploadRes = await fetch(`${API_BASE}/admin/upload/ceo-image`, {
          method: "POST",
          headers: { Authorization: `Bearer ${getToken()}` },
          body: fd,
        });
        const uploadData = await uploadRes.json() as { url?: string; error?: string };
        if (!uploadRes.ok) throw new Error(uploadData.error || "Image upload failed");
        finalImageUrl = uploadData.url;
        setImagePreview(finalImageUrl!);
        setImageFile(null);
      }

      const res = await fetch(`${API_BASE}/admin/settings`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ ...form, ceoImageUrl: finalImageUrl }),
      });
      const data = await res.json() as SiteSettings & { error?: string };
      if (!res.ok) throw new Error((data as { error?: string }).error || "Save failed");
      setSettings(data);
      setForm({ ceoName: data.ceoName, phone: data.phone, hqAddress: data.hqAddress, hqCity: data.hqCity });
      setStatus({ type: "success", msg: "Site updated successfully! Changes are live." });
    } catch (err) {
      setStatus({ type: "error", msg: err instanceof Error ? err.message : "Update failed" });
    } finally {
      setSaving(false);
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
    <div className="min-h-screen bg-[hsl(210,20%,6%)]">
      {/* Header */}
      <div className="border-b border-[hsl(210,15%,14%)] bg-[hsl(210,18%,8%)]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <div className="h-px w-6 bg-[hsl(199,89%,48%)]" />
              <span className="text-[hsl(199,89%,60%)] text-xs font-semibold tracking-[0.2em] uppercase">Admin Panel</span>
            </div>
            <h1 className="text-white font-bold text-lg">Blueline Offshore</h1>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 border border-[hsl(210,15%,20%)] text-[hsl(210,10%,55%)] hover:text-white hover:border-[hsl(210,15%,30%)] rounded-lg text-sm transition-colors"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* Status banner */}
        {status && (
          <div className={`flex items-center gap-3 px-5 py-4 rounded-xl border text-sm ${
            status.type === "success"
              ? "bg-green-500/10 border-green-500/30 text-green-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}>
            {status.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {status.msg}
          </div>
        )}

        {/* CEO Photo */}
        <div className="bg-[hsl(210,18%,10%)] border border-[hsl(210,15%,16%)] rounded-2xl p-6">
          <h2 className="text-white font-semibold text-lg mb-1">CEO Photo</h2>
          <p className="text-[hsl(210,10%,50%)] text-sm mb-6">Upload a new photo for the CEO on the About page. JPEG or PNG, max 10MB.</p>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-36 h-36 rounded-xl overflow-hidden border-2 border-[hsl(210,15%,20%)] bg-[hsl(210,20%,7%)]">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="CEO preview"
                    className="w-full h-full object-cover object-top"
                    onError={e => { (e.target as HTMLImageElement).src = ""; }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[hsl(210,10%,35%)] text-xs">No image</div>
                )}
              </div>
              <p className="text-[hsl(210,10%,40%)] text-xs mt-2 text-center">Current photo</p>
            </div>

            <div className="flex-1">
              <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleFileChange} />
              <button
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 px-5 py-3 border border-dashed border-[hsl(199,89%,48%)]/40 hover:border-[hsl(199,89%,48%)] text-[hsl(199,89%,60%)] hover:text-white rounded-xl text-sm transition-colors mb-3"
              >
                <Upload size={16} />
                {imageFile ? imageFile.name : "Choose Photo"}
              </button>
              {imageFile && (
                <p className="text-[hsl(210,10%,50%)] text-xs">
                  New photo selected — click <strong className="text-white">Update Site</strong> below to save.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* CEO Name */}
        <div className="bg-[hsl(210,18%,10%)] border border-[hsl(210,15%,16%)] rounded-2xl p-6">
          <h2 className="text-white font-semibold text-lg mb-1">CEO Name</h2>
          <p className="text-[hsl(210,10%,50%)] text-sm mb-5">Displayed on the About page under leadership.</p>
          <input
            type="text"
            value={form.ceoName}
            onChange={e => setForm(f => ({ ...f, ceoName: e.target.value }))}
            className="w-full px-4 py-3 bg-[hsl(210,20%,7%)] border border-[hsl(210,15%,18%)] rounded-lg text-white placeholder-[hsl(210,10%,30%)] text-sm focus:outline-none focus:border-[hsl(199,89%,48%)] transition-colors"
            placeholder="CEO full name"
          />
        </div>

        {/* Phone Number */}
        <div className="bg-[hsl(210,18%,10%)] border border-[hsl(210,15%,16%)] rounded-2xl p-6">
          <h2 className="text-white font-semibold text-lg mb-1">Phone Number</h2>
          <p className="text-[hsl(210,10%,50%)] text-sm mb-5">Displayed on the Contact page for all office locations.</p>
          <input
            type="text"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className="w-full px-4 py-3 bg-[hsl(210,20%,7%)] border border-[hsl(210,15%,18%)] rounded-lg text-white placeholder-[hsl(210,10%,30%)] text-sm focus:outline-none focus:border-[hsl(199,89%,48%)] transition-colors"
            placeholder="(000) 000-0000"
          />
        </div>

        {/* HQ Address */}
        <div className="bg-[hsl(210,18%,10%)] border border-[hsl(210,15%,16%)] rounded-2xl p-6">
          <h2 className="text-white font-semibold text-lg mb-1">HQ Address</h2>
          <p className="text-[hsl(210,10%,50%)] text-sm mb-5">Headquarters street address and city shown on the Contact page.</p>
          <div className="space-y-3">
            <input
              type="text"
              value={form.hqAddress}
              onChange={e => setForm(f => ({ ...f, hqAddress: e.target.value }))}
              className="w-full px-4 py-3 bg-[hsl(210,20%,7%)] border border-[hsl(210,15%,18%)] rounded-lg text-white placeholder-[hsl(210,10%,30%)] text-sm focus:outline-none focus:border-[hsl(199,89%,48%)] transition-colors"
              placeholder="Street address"
            />
            <input
              type="text"
              value={form.hqCity}
              onChange={e => setForm(f => ({ ...f, hqCity: e.target.value }))}
              className="w-full px-4 py-3 bg-[hsl(210,20%,7%)] border border-[hsl(210,15%,18%)] rounded-lg text-white placeholder-[hsl(210,10%,30%)] text-sm focus:outline-none focus:border-[hsl(199,89%,48%)] transition-colors"
              placeholder="City, State ZIP"
            />
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pb-10">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-3 px-8 py-4 bg-[hsl(199,89%,48%)] hover:bg-[hsl(199,89%,42%)] text-white font-semibold text-sm rounded-xl transition-all disabled:opacity-60 shadow-lg shadow-[hsl(199,89%,48%)]/20"
          >
            {saving ? <><Loader2 size={18} className="animate-spin" /> Updating Site...</> : <><Save size={18} /> Update Site</>}
          </button>
        </div>
      </div>
    </div>
  );
}
