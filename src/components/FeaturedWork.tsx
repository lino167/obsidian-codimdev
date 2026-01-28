import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Github, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

interface Project {
  id: number;
  title: string;
  short_description: string;
  cover_image: string;
  tech_stack: string[];
  slug: string;
  repo_url?: string;
  live_url?: string;
}

export const FeaturedWork = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        // Busca projetos onde 'is_featured' é TRUE e 'is_public' é TRUE
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('is_public', true)
          .eq('is_featured', true)
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) {
          console.error("Erro Supabase:", error);
        } else {
          setProjects(data || []);
        }
      } catch (err) {
        console.error("Erro geral:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  if (loading) return (
    <div className="py-24 flex justify-center bg-neutral-950">
      <Loader2 className="animate-spin text-crimson w-8 h-8" />
    </div>
  );

  // Se não tiver projetos destaque, esconde a seção para não ficar feio
  if (projects.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              PROJETOS EM DESTAQUE
            </h2>
            <div className="h-1 w-20 bg-crimson"></div>
          </div>
          <Link to="/work" className="hidden md:flex items-center text-crimson hover:text-white transition-colors gap-2 font-mono text-sm group">
            VER ARQUIVO COMPLETO <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-neutral-900 border border-white/5 hover:border-crimson/50 transition-all duration-500 overflow-hidden flex flex-col h-full rounded-sm"
            >
              {/* Container da Imagem */}
              <div className="aspect-video overflow-hidden relative bg-neutral-800">
                <div className="absolute inset-0 bg-crimson/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500" />
                {project.cover_image ? (
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20 font-mono text-xs">NO IMAGE DATA</div>
                )}
              </div>

              {/* Conteúdo */}
              <div className="p-6 flex flex-col flex-1">
                {/* Tech Stack */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {project.tech_stack?.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-[10px] font-mono px-2 py-1 bg-white/5 text-white/70 border border-white/10 rounded-sm">
                      {tech}
                    </span>
                  ))}
                  {(project.tech_stack?.length || 0) > 3 && (
                    <span className="text-[10px] font-mono px-2 py-1 text-white/40">+{project.tech_stack!.length - 3}</span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 font-display group-hover:text-crimson transition-colors">
                  {project.title}
                </h3>

                <p className="text-neutral-400 text-sm mb-6 line-clamp-2 font-sans flex-1">
                  {project.short_description || "Detalhes confidenciais."}
                </p>

                {/* Footer do Card */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5 mt-auto">
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-mono text-white hover:text-crimson transition-colors">
                      <ExternalLink className="w-3 h-3" /> DEPLOY
                    </a>
                  )}
                  {project.repo_url && (
                    <a href={project.repo_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-mono text-white hover:text-crimson transition-colors">
                      <Github className="w-3 h-3" /> CODE
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:hidden text-center">
          <Link to="/work">
            <Button variant="outline" className="w-full border-crimson text-crimson hover:bg-crimson hover:text-white">
              VER TODOS OS PROJETOS
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
