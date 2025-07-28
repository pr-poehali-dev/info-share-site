import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'

interface Article {
  id: number
  title: string
  description: string
  category: string
  readTime: string
  date: string
  isBookmarked: boolean
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Все')
  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      title: 'Основы веб-разработки',
      description: 'Полное руководство по основам создания современных веб-сайтов. Изучите HTML, CSS и JavaScript.',
      category: 'Технологии',
      readTime: '5 мин',
      date: '25 июля 2025',
      isBookmarked: false
    },
    {
      id: 2,
      title: 'Дизайн пользовательского интерфейса',
      description: 'Принципы создания интуитивных и красивых интерфейсов. Типографика, цвета и композиция.',
      category: 'Дизайн',
      readTime: '8 мин',
      date: '24 июля 2025',
      isBookmarked: true
    },
    {
      id: 3,
      title: 'Мобильная разработка в 2025',
      description: 'Тенденции и лучшие практики разработки мобильных приложений. React Native и Flutter.',
      category: 'Технологии',
      readTime: '12 мин',
      date: '23 июля 2025',
      isBookmarked: false
    },
    {
      id: 4,
      title: 'Маркетинговые стратегии',
      description: 'Эффективные подходы к цифровому маркетингу. SEO, контент-маркетинг и социальные сети.',
      category: 'Маркетинг',
      readTime: '10 мин',
      date: '22 июля 2025',
      isBookmarked: false
    },
    {
      id: 5,
      title: 'Основы финансовой грамотности',
      description: 'Как управлять личными финансами. Инвестиции, сбережения и планирование бюджета.',
      category: 'Финансы',
      readTime: '15 мин',
      date: '21 июля 2025',
      isBookmarked: true
    },
    {
      id: 6,
      title: 'Здоровый образ жизни',
      description: 'Простые способы улучшить качество жизни. Питание, спорт и ментальное здоровье.',
      category: 'Здоровье',
      readTime: '7 мин',
      date: '20 июля 2025',
      isBookmarked: false
    }
  ])

  const categories = ['Все', 'Технологии', 'Дизайн', 'Маркетинг', 'Финансы', 'Здоровье']

  const toggleBookmark = (id: number) => {
    setArticles(articles.map(article => 
      article.id === id ? { ...article, isBookmarked: !article.isBookmarked } : article
    ))
  }

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'Все' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const bookmarkedArticles = articles.filter(article => article.isBookmarked)

  return (
    <div className="min-h-screen" style={{backgroundColor: 'rgb(251 247 240)'}}>
      {/* Header */}
      <header className="border-b" style={{borderColor: 'rgb(217 179 140)', backgroundColor: 'rgb(220 235 222)'}}>
        <div className="container mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Information Hub</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Центр полезной информации для развития и обучения
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icon name="Search" size={20} />
                  Поиск
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Поиск статей..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icon name="Folder" size={20} />
                  Категории
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bookmarked Articles */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icon name="Star" size={20} />
                  Закладки ({bookmarkedArticles.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bookmarkedArticles.length > 0 ? (
                    bookmarkedArticles.map(article => (
                      <div key={article.id} className="p-3 bg-muted rounded-lg">
                        <h4 className="font-medium text-sm text-foreground line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {article.readTime} • {article.date}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Пока нет сохранённых статей
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">
                  {selectedCategory === 'Все' ? 'Все статьи' : selectedCategory}
                </h2>
                <p className="text-muted-foreground">
                  {filteredArticles.length} {filteredArticles.length === 1 ? 'статья' : 'статей'}
                </p>
              </div>

              <div className="grid gap-6">
                {filteredArticles.map(article => (
                  <Card key={article.id} className="group hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="text-xs">
                              {article.category}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {article.readTime}
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          
                          <p className="text-muted-foreground leading-relaxed">
                            {article.description}
                          </p>
                          
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-sm text-muted-foreground">
                              {article.date}
                            </span>
                            <Button variant="outline" size="sm">
                              Читать далее
                            </Button>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-4 shrink-0"
                          onClick={() => toggleBookmark(article.id)}
                        >
                          <Icon 
                            name={article.isBookmarked ? "Star" : "Star"}
                            size={20}
                            className={article.isBookmarked ? "fill-primary text-primary" : "text-muted-foreground"}
                          />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Статьи не найдены
                  </h3>
                  <p className="text-muted-foreground">
                    Попробуйте изменить поисковый запрос или выберите другую категорию
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index