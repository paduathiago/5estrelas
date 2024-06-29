import { cn } from '@/lib/utils';
import {
  Briefcase,
  Star,
  Home,
  User,
  LogOut
} from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className={cn("pb-12 h-full")}>
      <div className="space-y-4 py-4 h-full flex flex-col justify-between items-center">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            5estrelas
          </h2>
          <div className="space-y-1 w-40">
            <Link
              to="/"
            >
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-start"
              >
                <Home className="mr-2 h-4 w-4" />
                Página inicial
              </Button>
            </Link>

            <Button variant="secondary" size="sm" className="w-full justify-start">
              <Star className="mr-2 h-4 w-4" />
              Favoritos
            </Button>
            <Button variant="secondary" size="sm" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Meu Perfil
            </Button>

            <Button variant="default" size="sm" className="w-full justify-start">
              <Briefcase className="mr-2 h-4 w-4" />
              Meus serviços
            </Button>
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