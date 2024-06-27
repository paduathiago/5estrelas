import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Radio,
  Home,
  User
} from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className={cn("pb-12")}>
      <div className="space-y-4 py-4">
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
              Home
            </Button>
            </Link>
            
            <Button variant="secondary" size="sm" className="w-full justify-start">
              <LayoutGrid className="mr-2 h-4 w-4" />
              Browse
            </Button>
            <Button variant="secondary" size="sm" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Usuário
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar