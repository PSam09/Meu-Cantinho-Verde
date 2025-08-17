import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

const communityPosts = [
  {
    id: 1,
    user: 'Ana_Jardineira',
    avatar: 'https://i.pravatar.cc/150?u=ana',
    plantName: 'Minha Monstera Deliciosa',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500&auto=format&fit=crop',
    caption: 'Finalmente consegui uma folha nova com fenestração! Tão feliz com o progresso dela. 🌱',
  },
  {
    id: 2,
    user: 'Beto_Cactos',
    avatar: 'https://i.pravatar.cc/150?u=beto',
    plantName: 'Coleção de Suculentas',
    image: 'https://images.unsplash.com/photo-1534359092-2649ce48a110?w=500&auto=format&fit=crop',
    caption: 'O sol da tarde está fazendo maravilhas para as cores dessas meninas.',
  },
  {
    id: 3,
    user: 'Clara_da_Selva',
    avatar: 'https://i.pravatar.cc/150?u=clara',
    plantName: 'Meu cantinho verde',
    image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=500&auto=format&fit=crop',
    caption: 'Não há nada como relaxar em casa rodeada pelas minhas plantas. Traz tanta paz!',
  },
];

const Community: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-emerald-800">{t('community.title')}</h2>
        <p className="text-stone-600">{t('community.subtitle')}</p>
      </div>

      <div className="space-y-8">
        {communityPosts.map(post => (
          <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in-up">
            <div className="p-4 flex items-center space-x-3">
              <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-bold text-stone-800">{post.user}</p>
                <p className="text-sm text-stone-500">{post.plantName}</p>
              </div>
            </div>
            <img src={post.image} alt={post.plantName} className="w-full h-auto object-cover" />
            <div className="p-4">
              <p className="text-stone-700">{post.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;