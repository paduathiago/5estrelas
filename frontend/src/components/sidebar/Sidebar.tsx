import { cn } from '@/lib/utils';
import {
  Briefcase,
  Star,
  Home,
  User,
  LogOut,
  Plus,
  BriefcaseBusiness,
  BriefcaseBusinessIcon,
  LucideBriefcase,
  UserSquareIcon
} from 'lucide-react';
import { Button } from '../ui/button';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();
  const path = location.pathname;
  console.log(path);
  return (
    <div className={cn("pb-12 h-full")}>
      <div className="space-y-4 py-4 h-full flex flex-col justify-between items-center">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            5estrelas
          </h2>
          <div className="flex flex-col gap-2 w-40">
            <Link
              to="/"
            >
              <Button
                variant={path === "/" ? "default" : "secondary"}
                size="sm"
                className="w-full justify-start"
              >
                <Home className="mr-2 h-4 w-4" />
                Página inicial
              </Button>
            </Link>

            <Link
              to="/establishments"
            >
              <Button variant={path === "/establishments" ? "default" : "secondary"} size="sm" className="w-full justify-start">
                <BriefcaseBusiness className="mr-2 h-4 w-4" />
                Todos os serviços
              </Button>
            </Link>

            <Link
              to="/new-establishment"
            >
              <Button variant={path === "/new-establishment" ? "default" : "secondary"} size="sm" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Cadastrar serviço
              </Button>
            </Link>

            <Link
              to="/favorites"
            >
            <Button variant={path === "/favorites" ? "default" : "secondary"} size="sm" className="w-full justify-start">
              <Star className="mr-2 h-4 w-4" />
              Favoritos
            </Button>
            </Link>

            <Link
              to="/profile"
            >
            <Button variant={path === "/profile" ? "default" : "secondary"} size="sm" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Meu Perfil
            </Button>
            </Link>

            <Link
              to="/my-services"
            >
            <Button variant={path === "/my-services" ? "default" : "secondary"} size="sm" className="w-full justify-start">
            <UserSquareIcon className="mr-2 h-4 w-4" />
              Meus serviços
            </Button>
            </Link>

          </div>
        </div>
        <Button variant="default" size="sm" className="w-40">
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  )
}

export default Sidebar