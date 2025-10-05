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
          title: "Регистрация успешна! 🎮",
          description: "Добро пожаловать в игровой мир!",
        });
        setFormData({ username: '', email: '', password: '' });
      } else {
        throw new Error('Ошибка регистрации');
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось зарегистрироваться. Попробуйте снова.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#00B2FF] via-[#7B61FF] to-[#FB00FF]">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-16 h-16 bg-[#FFD700] rotate-45 animate-float" />
        <div className="absolute top-40 right-20 w-20 h-20 bg-[#FB070F] rotate-12 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-[#00B2FF] rotate-45 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-[#FB00FF] rotate-12 animate-float" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-7xl font-heading font-black mb-4 text-white drop-shadow-lg tracking-wider" style={{
            textShadow: '4px 4px 0 #00B2FF, 8px 8px 0 #FB00FF',
            WebkitTextStroke: '2px #1A1A1A'
          }}>
            GAMING PORTAL
          </h1>
          <p className="text-2xl font-bold text-white drop-shadow-md">Присоединяйся к блочной вселенной!</p>
        </div>

        <div className="max-w-md mx-auto animate-scale-in">
          <Card className="p-8 bg-white/95 backdrop-blur-sm border-4 border-[#00B2FF] shadow-2xl relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FB00FF] to-[#00B2FF] text-white px-6 py-2 rounded-full border-4 border-white shadow-lg">
              <div className="flex items-center gap-2">
                <Icon name="Gamepad2" size={24} />
                <span className="font-heading font-bold text-lg">РЕГИСТРАЦИЯ</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                  <Icon name="User" size={16} />
                  Username
                </label>
                <Input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  className="border-3 border-[#00B2FF] focus:border-[#FB00FF] focus:ring-[#FB00FF] h-12 text-lg font-semibold"
                  placeholder="Твой игровой ник"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="border-3 border-[#00B2FF] focus:border-[#FB00FF] focus:ring-[#FB00FF] h-12 text-lg"
                  placeholder="твой@email.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                  <Icon name="Lock" size={16} />
                  Password
                </label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="border-3 border-[#00B2FF] focus:border-[#FB00FF] focus:ring-[#FB00FF] h-12 text-lg"
                  placeholder="Секретный код"
                />
              </div>

              <div className="space-y-3 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 text-xl font-heading font-black uppercase bg-gradient-to-r from-[#00B2FF] to-[#0EA5E9] hover:from-[#0EA5E9] hover:to-[#00B2FF] text-white border-4 border-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}
                >
                  {isLoading ? 'Загрузка...' : '🎮 ИГРАТЬ'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 font-bold border-3 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#FFD700] hover:border-[#FFD700] transition-all"
                >
                  Уже есть аккаунт?
                </Button>
              </div>
            </form>
          </Card>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            {['🎮', '🎯', '⚡', '🏆', '🎲', '🔥'].map((emoji, idx) => (
              <div
                key={idx}
                className="w-16 h-16 bg-white/90 rounded-lg flex items-center justify-center text-3xl shadow-lg border-3 border-[#00B2FF] animate-pixel-pulse"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center text-white font-bold text-lg drop-shadow-lg">
          <p className="flex items-center justify-center gap-2 animate-fade-in">
            <Icon name="Sparkles" size={20} />
            <span>Более 1000+ игроков уже в игре!</span>
            <Icon name="Sparkles" size={20} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;