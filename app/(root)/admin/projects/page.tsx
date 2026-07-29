"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { MagneticButton } from "@/components/MagneticButton";

interface Project {
  id?: string;
  projectId: string;
  accessCode: string;
  completionPercentage: number;
  currentPhase: string;
  nextMilestone: string;
  totalValue: string;
  amountPaid: string;
  nextDue: string;
  images: string[];
}

export default function AdminProjectsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [fetching, setFetching] = useState(true);
  
  const [formData, setFormData] = useState<Project>({
    projectId: "",
    accessCode: "",
    completionPercentage: 0,
    currentPhase: "",
    nextMilestone: "",
    totalValue: "",
    amountPaid: "",
    nextDue: "",
    images: ["", "", ""]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user?.email === "admin@srtconstructions.in") {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    if (!db) return;
    try {
      const querySnapshot = await getDocs(collection(db, "client_projects"));
      const projList: Project[] = [];
      querySnapshot.forEach((doc) => {
        projList.push({ id: doc.id, ...doc.data() } as Project);
      });
      setProjects(projList);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
    setFetching(false);
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    setIsSubmitting(true);
    setMessage("");

    try {
      const cleanData = {
        ...formData,
        images: formData.images.filter(img => img.trim() !== ""),
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, "client_projects"), cleanData);
      setMessage("Project successfully created!");
      setFormData({
        projectId: "", accessCode: "", completionPercentage: 0,
        currentPhase: "", nextMilestone: "", totalValue: "",
        amountPaid: "", nextDue: "", images: ["", "", ""]
      });
      fetchProjects();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(`Error: ${err.message}`);
      } else {
        setMessage("An unknown error occurred.");
      }
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!db || !confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteDoc(doc(db, "client_projects", id));
      fetchProjects();
    } catch (err) {
      alert("Failed to delete project");
    }
  };

  if (loading) return <div className="min-h-screen bg-[var(--color-background)] pt-[15vh] px-[6vw] text-white/50 text-center font-serif text-2xl">Authenticating...</div>;

  if (!user || user.email !== "admin@srtconstructions.in") {
    return (
      <div className="min-h-screen bg-[var(--color-background)] pt-[15vh] px-[6vw] pb-12 flex items-center justify-center">
        <div className="max-w-md w-full bg-[var(--color-stone-dark)] p-10 border border-red-500/30 text-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-6 text-red-500/50">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <h2 className="font-serif text-2xl text-white mb-2">Access Denied</h2>
          <p className="text-white/60 mb-8 text-sm">Strictly restricted to SRT Administrators.</p>
          <div onClick={() => router.push('/en/portal')}>
            <MagneticButton>Go to Login</MagneticButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-[15vh] px-[6vw] pb-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        
        {/* Create Project Form */}
        <div>
          <h1 className="font-serif text-4xl text-[var(--color-bronze)] mb-2">Client Projects</h1>
          <p className="text-white/60 mb-8">Create and manage access for the Client Portal.</p>

          <form onSubmit={handleSubmit} className="bg-[var(--color-stone-dark)] p-8 border border-white/10 space-y-6">
            <h2 className="font-serif text-2xl text-white border-b border-white/10 pb-4">Create New Project</h2>
            
            {message && (
              <div className={`p-4 text-sm rounded ${message.startsWith("Error") ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"}`}>
                {message}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Project ID (Login)</label>
                <input required type="text" value={formData.projectId} onChange={(e) => setFormData({...formData, projectId: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-[var(--color-bronze)] outline-none" placeholder="e.g. SRT-2026" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Access Code (Password)</label>
                <input required type="text" value={formData.accessCode} onChange={(e) => setFormData({...formData, accessCode: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-[var(--color-bronze)] outline-none" placeholder="e.g. secret123" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Completion %</label>
                <input required type="number" min="0" max="100" value={formData.completionPercentage} onChange={(e) => setFormData({...formData, completionPercentage: Number(e.target.value)})} className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-[var(--color-bronze)] outline-none" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Current Phase</label>
                <input required type="text" value={formData.currentPhase} onChange={(e) => setFormData({...formData, currentPhase: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-[var(--color-bronze)] outline-none" placeholder="e.g. Foundation" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Next Milestone</label>
              <input required type="text" value={formData.nextMilestone} onChange={(e) => setFormData({...formData, nextMilestone: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-[var(--color-bronze)] outline-none" placeholder="e.g. Roof Slab (Expected Sept 1)" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Total Value</label>
                <input required type="text" value={formData.totalValue} onChange={(e) => setFormData({...formData, totalValue: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-[var(--color-bronze)] outline-none" placeholder="₹ 1.25 Cr" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Amount Paid</label>
                <input required type="text" value={formData.amountPaid} onChange={(e) => setFormData({...formData, amountPaid: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-[var(--color-bronze)] outline-none" placeholder="₹ 45.5 L" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Next Due</label>
                <input required type="text" value={formData.nextDue} onChange={(e) => setFormData({...formData, nextDue: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-[var(--color-bronze)] outline-none" placeholder="₹ 15.0 L" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Recent Site Photos (URLs)</label>
              <div className="space-y-2">
                {formData.images.map((img, idx) => (
                  <input key={idx} type="url" value={img} onChange={(e) => handleImageChange(idx, e.target.value)} className="w-full bg-white/5 border border-white/10 p-3 text-white text-sm focus:border-[var(--color-bronze)] outline-none" placeholder="https://imgur.com/your-image.jpg" />
                ))}
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-[var(--color-bronze)] text-black px-8 py-4 font-semibold tracking-wider uppercase text-sm disabled:opacity-50">
              {isSubmitting ? "Saving..." : "Create Client Project"}
            </button>
          </form>
        </div>

        {/* Existing Projects List */}
        <div>
          <h2 className="font-serif text-2xl text-white mb-6">Active Projects ({projects.length})</h2>
          
          {fetching ? (
            <p className="text-white/50">Loading projects...</p>
          ) : projects.length === 0 ? (
            <p className="text-white/50">No client projects found.</p>
          ) : (
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-white/5 p-6 border border-white/10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl text-[var(--color-bronze)] font-serif">{proj.projectId}</h3>
                      <p className="text-xs text-white/50 uppercase tracking-widest">Code: {proj.accessCode}</p>
                    </div>
                    <button onClick={() => handleDelete(proj.id!)} className="text-red-400 hover:text-red-300 text-xs uppercase tracking-widest">Delete</button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-white/80">
                    <div><span className="text-white/50 mr-2">Progress:</span>{proj.completionPercentage}%</div>
                    <div><span className="text-white/50 mr-2">Phase:</span>{proj.currentPhase}</div>
                    <div><span className="text-white/50 mr-2">Total:</span>{proj.totalValue}</div>
                    <div><span className="text-white/50 mr-2">Paid:</span>{proj.amountPaid}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
