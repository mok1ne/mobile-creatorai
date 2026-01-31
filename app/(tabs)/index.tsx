import {
  Award,
  BarChart3,
  Bookmark,
  Camera,
  Check,
  ChevronRight,
  FileText,
  LogIn,
  Menu,
  Moon,
  Play,
  Search,
  Settings,
  Sparkles,
  Sun,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// Типы данных
interface Niche {
  id: number;
  name: string;
  competition: string;
  cpm: string;
  growth: string;
  icon: string;
}

interface Scene {
  time: string;
  type: string;
  text: string;
  visual: string;
  music: string;
}

interface GeneratedScript {
  id: string;
  title: string;
  scenes: Scene[];
  tags: string[];
  description: string;
  bestTime: string;
  savedAt?: Date;
}

interface Tip {
  emoji: string;
  title: string;
  text: string;
}

const YouTubeCreatorApp = () => {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [selectedNiche, setSelectedNiche] = useState<Niche | null>(null);
  const [generatedScript, setGeneratedScript] =
    useState<GeneratedScript | null>(null);
  const [savedScripts, setSavedScripts] = useState<GeneratedScript[]>([]);
  const [showSavedScripts, setShowSavedScripts] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentTipIndex, setCurrentTipIndex] = useState<number>(0);
  const [showProModal, setShowProModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  // ================Темная тема

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const iconColorMenu = isDarkTheme ? "#fff" : "#000";
  const iconColorSettings = isDarkTheme ? "#dfdfdf" : "#4b5563";
  const themeAnimValue = useRef(
    new Animated.Value(isDarkTheme ? 1 : 0),
  ).current;

  // useEffect для анимации при переключении темы
  useEffect(() => {
    Animated.spring(themeAnimValue, {
      toValue: isDarkTheme ? 1 : 0,
      useNativeDriver: false,
      damping: 15,
      stiffness: 150,
    }).start();
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  const SearchBar = React.memo(
    ({ value, onChange }: { value: string; onChange: (t: string) => void }) => {
      return (
        <View style={styles.searchContainer}>
          <Search color="#9ca3af" size={20} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, isDarkTheme && styles.searchInputDark]}
            placeholder="Поиск ниш..."
            value={value}
            onChangeText={onChange}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
            blurOnSubmit={false}
          />
        </View>
      );
    },
  );

  const onChangeSearch = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);
  // Расширенный список ниш
  const allNiches: Niche[] = [
    {
      id: 1,
      name: "Финансы и инвестиции",
      competition: "Средняя",
      cpm: "$8-12",
      growth: "+45%",
      icon: "💰",
    },
    {
      id: 2,
      name: "Мотивация и саморазвитие",
      competition: "Высокая",
      cpm: "$6-10",
      growth: "+38%",
      icon: "🚀",
    },
    {
      id: 3,
      name: "Технологии и гаджеты",
      competition: "Высокая",
      cpm: "$10-15",
      growth: "+52%",
      icon: "📱",
    },
    {
      id: 4,
      name: "Здоровье и фитнес",
      competition: "Средняя",
      cpm: "$7-11",
      growth: "+41%",
      icon: "💪",
    },
    {
      id: 5,
      name: "Психология и отношения",
      competition: "Низкая",
      cpm: "$5-9",
      growth: "+33%",
      icon: "🧠",
    },
    {
      id: 6,
      name: "Кулинария и рецепты",
      competition: "Средняя",
      cpm: "$4-8",
      growth: "+29%",
      icon: "🍳",
    },
    {
      id: 7,
      name: "Бизнес и предпринимательство",
      competition: "Высокая",
      cpm: "$9-14",
      growth: "+48%",
      icon: "💼",
    },
    {
      id: 8,
      name: "Образование и наука",
      competition: "Средняя",
      cpm: "$7-12",
      growth: "+35%",
      icon: "📚",
    },
    {
      id: 9,
      name: "Путешествия и туризм",
      competition: "Высокая",
      cpm: "$6-10",
      growth: "+42%",
      icon: "✈️",
    },
    {
      id: 10,
      name: "Мода и стиль",
      competition: "Высокая",
      cpm: "$5-9",
      growth: "+31%",
      icon: "👗",
    },
    {
      id: 11,
      name: "Игры и киберспорт",
      competition: "Очень высокая",
      cpm: "$8-13",
      growth: "+55%",
      icon: "🎮",
    },
    {
      id: 12,
      name: "Криптовалюта и NFT",
      competition: "Высокая",
      cpm: "$10-16",
      growth: "+61%",
      icon: "₿",
    },
    {
      id: 13,
      name: "Недвижимость",
      competition: "Средняя",
      cpm: "$11-18",
      growth: "+37%",
      icon: "🏠",
    },
    {
      id: 14,
      name: "Авто и транспорт",
      competition: "Средняя",
      cpm: "$8-13",
      growth: "+34%",
      icon: "🚗",
    },
    {
      id: 15,
      name: "DIY и хендмейд",
      competition: "Низкая",
      cpm: "$4-7",
      growth: "+28%",
      icon: "🔨",
    },
    {
      id: 16,
      name: "Музыка и продюсирование",
      competition: "Высокая",
      cpm: "$5-9",
      growth: "+39%",
      icon: "🎵",
    },
    {
      id: 17,
      name: "Маркетинг и SMM",
      competition: "Средняя",
      cpm: "$8-12",
      growth: "+44%",
      icon: "📊",
    },
    {
      id: 18,
      name: "Карьера и HR",
      competition: "Низкая",
      cpm: "$7-11",
      growth: "+32%",
      icon: "👔",
    },
    {
      id: 19,
      name: "Домашние животные",
      competition: "Средняя",
      cpm: "$5-8",
      growth: "+27%",
      icon: "🐕",
    },
    {
      id: 20,
      name: "Искусство и дизайн",
      competition: "Средняя",
      cpm: "$6-10",
      growth: "+36%",
      icon: "🎨",
    },
    {
      id: 21,
      name: "Фотография и видео",
      competition: "Высокая",
      cpm: "$7-11",
      growth: "+40%",
      icon: "📷",
    },
    {
      id: 22,
      name: "Спорт и футбол",
      competition: "Высокая",
      cpm: "$6-10",
      growth: "+43%",
      icon: "⚽",
    },
    {
      id: 23,
      name: "Красота и косметика",
      competition: "Очень высокая",
      cpm: "$5-9",
      growth: "+38%",
      icon: "💄",
    },
    {
      id: 24,
      name: "Родительство и дети",
      competition: "Средняя",
      cpm: "$6-9",
      growth: "+30%",
      icon: "👶",
    },
  ];

  // Советы дня
  const tips: Tip[] = [
    {
      emoji: "💡",
      title: "Совет дня",
      text: "Первые 3 секунды видео критически важны для удержания зрителей",
    },
    {
      emoji: "🎯",
      title: "Совет эксперта",
      text: "Используйте числа в заголовках - они увеличивают CTR на 36%",
    },
    {
      emoji: "⏰",
      title: "Лучшее время",
      text: "Публикуйте Shorts в 18:00-20:00 по МСК для максимального охвата",
    },
    {
      emoji: "🔥",
      title: "Тренд недели",
      text: "Короткие видео до 30 секунд получают на 40% больше досмотров",
    },
    {
      emoji: "💬",
      title: "Вовлечение",
      text: "Задавайте вопросы в конце видео - это повышает количество комментариев",
    },
    {
      emoji: "🎬",
      title: "Монтаж",
      text: "Меняйте кадр каждые 2-3 секунды для удержания внимания",
    },
    {
      emoji: "📱",
      title: "Формат",
      text: "Вертикальный формат 9:16 получает в 2 раза больше просмотров",
    },
    {
      emoji: "🎵",
      title: "Музыка",
      text: "Трендовая музыка увеличивает шансы попасть в рекомендации на 50%",
    },
  ];
  const MENU_WIDTH = 280;
  const menuSlideAnim = useRef(new Animated.Value(MENU_WIDTH)).current;
  const insets = useSafeAreaInsets();

  // Анимация меню
  useEffect(() => {
    if (menuOpen) {
      // старт за экраном
      menuSlideAnim.setValue(MENU_WIDTH);

      Animated.spring(menuSlideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 22,
        stiffness: 180,
        mass: 1,
      }).start();
    }
  }, [menuOpen]);
  const closeMenu = () => {
    Animated.timing(menuSlideAnim, {
      toValue: MENU_WIDTH,
      duration: 220,
      useNativeDriver: true,
    }).start(() => {
      setMenuOpen(false);
    });
  };

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => {
        const nextIndex = (prev + 1) % tips.length;
        // Скроллим к следующей карточке
        scrollViewRef.current?.scrollTo({
          x: nextIndex * (width - 48),
          animated: true,
        });
        return nextIndex;
      });
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Функция для клика на dot
  const handleDotPress = (idx: number) => {
    setCurrentTipIndex(idx);
    scrollViewRef.current?.scrollTo({
      x: idx * (width - 48),
      animated: true,
    });
  };

  const screenHeight = Dimensions.get("window").height;

  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const proSlideAnim = useRef(new Animated.Value(screenHeight)).current;
  const loginSlideAnim = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    if (selectedNiche !== null) {
      slideAnim.setValue(screenHeight);
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 22,
        stiffness: 180,
        mass: 1,
      }).start();
    }
  }, [selectedNiche]);

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: screenHeight,
      duration: 220,
      useNativeDriver: true,
    }).start(() => setSelectedNiche(null));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,

      onMoveShouldSetPanResponder: (_, g) => g.dy > 6 && Math.abs(g.dx) < 10,

      onPanResponderMove: (_, g) => {
        if (g.dy > 0) {
          slideAnim.setValue(g.dy);
        }
      },

      onPanResponderRelease: (_, g) => {
        if (g.dy > 120) {
          closeModal();
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            damping: 22,
            stiffness: 180,
          }).start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (showProModal) {
      proSlideAnim.setValue(screenHeight);
      Animated.spring(proSlideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 22,
        stiffness: 180,
        mass: 1,
      }).start();
    }
  }, [showProModal]);

  const proPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,

      onMoveShouldSetPanResponder: (_, g) => {
        return g.dy > 6 && Math.abs(g.dx) < 10;
      },

      onPanResponderMove: (_, g) => {
        if (g.dy > 0) {
          proSlideAnim.setValue(g.dy);
        }
      },

      onPanResponderRelease: (_, g) => {
        // учитываем скорость и дистанцию
        const shouldClose = g.dy > 120 || g.vy > 1.2;
        if (shouldClose) {
          Animated.timing(proSlideAnim, {
            toValue: screenHeight,
            duration: 200,
            useNativeDriver: true,
          }).start(() => setShowProModal(false));
        } else {
          Animated.spring(proSlideAnim, {
            toValue: 0,
            useNativeDriver: true,
            damping: 22,
            stiffness: 180,
          }).start();
        }
      },
    }),
  ).current;

  const closeProModal = () => {
    Animated.timing(proSlideAnim, {
      toValue: screenHeight,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShowProModal(false));
  };

  useEffect(() => {
    if (showLoginModal) {
      loginSlideAnim.setValue(screenHeight);
      Animated.spring(loginSlideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 22,
        stiffness: 180,
        mass: 1,
      }).start();
    }
  }, [showLoginModal]);

  const loginPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,

      onMoveShouldSetPanResponder: (_, g) => {
        return g.dy > 6 && Math.abs(g.dx) < 10;
      },

      onPanResponderMove: (_, g) => {
        if (g.dy > 0) {
          loginSlideAnim.setValue(g.dy);
        }
      },

      onPanResponderRelease: (_, g) => {
        const shouldClose = g.dy > 120 || g.vy > 1.2;
        if (shouldClose) {
          Animated.timing(loginSlideAnim, {
            toValue: screenHeight,
            duration: 200,
            useNativeDriver: true,
          }).start(() => setShowLoginModal(false));
        } else {
          Animated.spring(loginSlideAnim, {
            toValue: 0,
            useNativeDriver: true,
            damping: 22,
            stiffness: 180,
          }).start();
        }
      },
    }),
  ).current;

  const closeLoginModal = () => {
    Animated.timing(loginSlideAnim, {
      toValue: screenHeight,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShowLoginModal(false));
  };

  const filteredNiches = allNiches.filter((niche) =>
    niche.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const channelStats = {
    subscribers: "12.5K",
    views: "450K",
    avgRetention: "42%",
    avgCTR: "8.2%",
    trend: "23%",
  };

  const generateScript = (niche: Niche) => {
    setLoading(true);
    setTimeout(() => {
      const newScript: GeneratedScript = {
        id: `script_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: `5 ошибок в ${niche.name.toLowerCase()}, которые стоят вам денег`,
        scenes: [
          {
            time: "0:00-0:03",
            type: "ХУК",
            text: "Эта ошибка стоит вам 90% дохода на YouTube",
            visual: "Крупный план сгорающих денег, резкий переход",
            music: 'Напряженная, с ударом на слове "ошибка"',
          },
          {
            time: "0:03-0:15",
            type: "ПРОБЛЕМА",
            text: `Большинство новичков в ${niche.name.toLowerCase()} делают одну критическую ошибку...`,
            visual: "Графики падения, примеры неудачных видео",
            music: "Нарастающее напряжение",
          },
          {
            time: "0:15-0:45",
            type: "РЕШЕНИЕ",
            text: "Вот что нужно делать вместо этого: [5 конкретных советов]",
            visual: "Анимированные списки, примеры успешных каналов",
            music: "Оптимистичная, энергичная",
          },
          {
            time: "0:45-0:60",
            type: "CTA",
            text: "Подпишитесь, чтобы не пропустить секреты роста канала",
            visual: "Кнопка подписки, preview следующего видео",
            music: "Финальный аккорд",
          },
        ],
        tags: [
          "youtube советы",
          niche.name.toLowerCase(),
          "как набрать подписчиков",
          "монетизация youtube",
        ],
        description: `В этом видео я расскажу про главные ошибки в нише ${niche.name.toLowerCase()} и как их избежать...`,
        bestTime: "Вт-Чт, 18:00-20:00 MSK",
      };
      setGeneratedScript(newScript);
      setLoading(false);
    }, 1500);
  };

  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const [chartData] = useState(() =>
    days.map((day) => ({
      day,
      value: Math.random() * 100,
    })),
  );

  const saveScript = () => {
    if (generatedScript) {
      const scriptWithDate = { ...generatedScript, savedAt: new Date() };
      setSavedScripts([scriptWithDate, ...savedScripts]);
      setGeneratedScript(null);
      setShowSavedScripts(true);
    }
  };

  const deleteScript = (id: string) => {
    setSavedScripts(savedScripts.filter((script) => script.id !== id));
  };

  const loadScript = (script: GeneratedScript) => {
    setGeneratedScript(script);
    setShowSavedScripts(false);
  };

  const currentTip = tips[currentTipIndex];

  const HomeScreen = () => (
    <ScrollView
      style={[styles.container, isDarkTheme && styles.containerDark]}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    >
      <TouchableOpacity
        style={styles.statsCard}
        onPress={() => setActiveTab("analytics")}
        activeOpacity={0.8}
      >
        <View style={styles.statsHeader}>
          <View>
            <Text style={styles.statsTitle}>Ваш канал растёт! 🎉</Text>
            <Text style={styles.statsSubtitle}>
              +{channelStats.trend} за последний месяц
            </Text>
          </View>
          <TrendingUp color="#fff" size={48} opacity={0.8} />
        </View>
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Подписчики</Text>
            <Text style={styles.statValue}>{channelStats.subscribers}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Просмотры</Text>
            <Text style={styles.statValue}>{channelStats.views}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text
          style={[styles.sectionTitle, isDarkTheme && styles.sectionTitleDark]}
        >
          Быстрые действия
        </Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={[styles.actionCard, isDarkTheme && styles.actionCardDark]}
            onPress={() => setActiveTab("niches")}
            activeOpacity={0.7}
          >
            <Search color="#9333ea" size={32} />
            <Text
              style={[styles.actionText, isDarkTheme && styles.actionTextDark]}
            >
              Найти нишу
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionCard, isDarkTheme && styles.actionCardDark]}
            onPress={() => setActiveTab("scripts")}
            activeOpacity={0.7}
          >
            <FileText color="#2563eb" size={32} />
            <Text
              style={[styles.actionText, isDarkTheme && styles.actionTextDark]}
            >
              Сценарий
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionCard, isDarkTheme && styles.actionCardDark]}
            onPress={() => setActiveTab("analytics")}
            activeOpacity={0.7}
          >
            <BarChart3 color="#16a34a" size={32} />
            <Text
              style={[styles.actionText, isDarkTheme && styles.actionTextDark]}
            >
              Аналитика
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionCard, isDarkTheme && styles.actionCardDark]}
            onPress={() => setActiveTab("optimization")}
            activeOpacity={0.7}
          >
            <Sparkles color="#ea580c" size={32} />
            <Text
              style={[styles.actionText, isDarkTheme && styles.actionTextDark]}
            >
              Оптимизация
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  const NichesScreen = () => (
    <View style={[styles.fullScreen, isDarkTheme && styles.fullScreenDark]}>
      <View style={styles.header}>
        <Text
          style={[styles.headerTitle, isDarkTheme && styles.headerTitleDark]}
        >
          Анализ ниш
        </Text>
        <Text
          style={[
            styles.headerSubtitle,
            isDarkTheme && styles.headerSubtitleDark,
          ]}
        >
          Найдите перспективную нишу для вашего канала
        </Text>
      </View>

      <SearchBar value={searchQuery} onChange={onChangeSearch} />

      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {filteredNiches.length === 0 ? (
          <View
            style={[styles.emptyState, isDarkTheme && styles.emptyStateDark]}
          >
            <Search color="#d1d5db" size={48} />
            <Text
              style={[styles.emptyText, isDarkTheme && styles.emptyTextDark]}
            >
              Ниши не найдены
            </Text>
            <Text
              style={[
                styles.emptySubtext,
                isDarkTheme && styles.emptySubtextDark,
              ]}
            >
              Попробуйте изменить запрос
            </Text>
          </View>
        ) : (
          <View style={styles.nichesList}>
            {filteredNiches.map((niche) => (
              <TouchableOpacity
                key={niche.id}
                style={[styles.nicheCard, isDarkTheme && styles.nicheCardDark]}
                onPress={() => setSelectedNiche(niche)}
                activeOpacity={0.7}
              >
                <View style={styles.nicheHeader}>
                  <View style={styles.nicheInfo}>
                    <Text style={styles.nicheIcon}>{niche.icon}</Text>
                    <View>
                      <Text
                        style={[
                          styles.nicheName,
                          isDarkTheme && styles.nicheNameDark,
                        ]}
                      >
                        {niche.name}
                      </Text>
                      <View
                        style={[
                          styles.competitionBadge,
                          niche.competition === "Низкая" && styles.badgeGreen,
                          niche.competition === "Средняя" && styles.badgeYellow,
                          niche.competition === "Высокая" && styles.badgeOrange,
                          niche.competition === "Очень высокая" &&
                            styles.badgeRed,
                        ]}
                      >
                        <Text
                          style={[
                            styles.competitionText,
                            niche.competition === "Низкая" && styles.textGreen,
                            niche.competition === "Средняя" &&
                              styles.textYellow,
                            niche.competition === "Высокая" &&
                              styles.textOrange,
                            niche.competition === "Очень высокая" &&
                              styles.textRed,
                          ]}
                        >
                          {niche.competition} конкуренция
                        </Text>
                      </View>
                    </View>
                  </View>
                  <ChevronRight color="#9ca3af" size={20} />
                </View>
                <View style={styles.nicheStats}>
                  <View style={styles.nicheStat}>
                    <Text
                      style={[
                        styles.nicheStatLabel,
                        isDarkTheme && styles.nicheStatLabelDark,
                      ]}
                    >
                      CPM
                    </Text>
                    <Text
                      style={[
                        styles.nicheStatValue,
                        isDarkTheme && styles.nicheStatValueDark,
                      ]}
                    >
                      {niche.cpm}
                    </Text>
                  </View>
                  <View style={styles.nicheStat}>
                    <Text
                      style={[
                        styles.nicheStatLabel,
                        isDarkTheme && styles.nicheStatLabelDark,
                      ]}
                    >
                      Рост
                    </Text>
                    <Text
                      style={[
                        styles.nicheStatValueGreen,
                        isDarkTheme && styles.nicheStatValueGreenDark,
                      ]}
                    >
                      {niche.growth}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <Modal
        visible={selectedNiche !== null}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          {/* Фон */}
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={closeModal}
          />

          {/* Контент */}
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: slideAnim }] },
              isDarkTheme && styles.modalContentDark,
            ]}
          >
            {/* HANDLE */}
            <Animated.View
              {...panResponder.panHandlers}
              style={styles.modalHandle}
              hitSlop={{ top: 12, bottom: 12, left: 40, right: 40 }}
            >
              <View style={styles.handleBar} />
            </Animated.View>

            {selectedNiche && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalIcon}>{selectedNiche.icon}</Text>
                  <Text
                    style={[
                      styles.modalTitle,
                      isDarkTheme && styles.modalTitleDark,
                    ]}
                  >
                    {selectedNiche.name}
                  </Text>
                </View>

                <ScrollView
                  style={styles.modalBody}
                  showsVerticalScrollIndicator={false}
                >
                  <View
                    style={[
                      styles.modalSection,
                      isDarkTheme && styles.modalSectionDark,
                    ]}
                  >
                    <Text
                      style={[
                        styles.modalSectionTitle,
                        isDarkTheme && styles.modalSectionTitleDark,
                      ]}
                    >
                      📊 Метрики
                    </Text>
                    <View style={styles.modalGrid}>
                      <View>
                        <Text
                          style={[
                            styles.modalLabel,
                            isDarkTheme && styles.modalLabelDark,
                          ]}
                        >
                          CPM
                        </Text>
                        <Text
                          style={[
                            styles.modalValue,
                            isDarkTheme && styles.modalValueDark,
                          ]}
                        >
                          {selectedNiche.cpm}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={[
                            styles.modalLabel,
                            isDarkTheme && styles.modalLabelDark,
                          ]}
                        >
                          Рост рынка
                        </Text>
                        <Text style={styles.modalValueGreen}>
                          {selectedNiche.growth}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.modalSection,
                      isDarkTheme && styles.modalSectionDark,
                    ]}
                  >
                    <Text
                      style={[
                        styles.modalSectionTitle,
                        isDarkTheme && styles.modalSectionTitleDark,
                      ]}
                    >
                      💡 Рекомендации
                    </Text>
                    <Text
                      style={[
                        styles.recommendation,
                        isDarkTheme && styles.recommendationDark,
                      ]}
                    >
                      • Фокус на практичные советы
                    </Text>
                    <Text
                      style={[
                        styles.recommendation,
                        isDarkTheme && styles.recommendationDark,
                      ]}
                    >
                      • 45–60 секунд оптимально
                    </Text>
                    <Text
                      style={[
                        styles.recommendation,
                        isDarkTheme && styles.recommendationDark,
                      ]}
                    >
                      • Динамичный монтаж
                    </Text>
                  </View>
                </ScrollView>

                <TouchableOpacity
                  style={styles.modalButton}
                  activeOpacity={0.8}
                  onPress={() => {
                    closeModal();
                    setActiveTab("scripts");
                  }}
                >
                  <Text style={styles.modalButtonText}>
                    Создать сценарий для этой ниши
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Animated.View>
        </View>
      </Modal>
    </View>
  );

  const ScriptsScreen = () => (
    <ScrollView
      style={[styles.container, isDarkTheme && styles.containerDark]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text
          style={[styles.headerTitle, isDarkTheme && styles.headerTitleDark]}
        >
          Генератор сценариев
        </Text>
        <Text
          style={[
            styles.headerSubtitle,
            isDarkTheme && styles.headerSubtitleDark,
          ]}
        >
          AI создаст детальный сценарий с описанием сцен
        </Text>
      </View>

      {savedScripts.length > 0 && (
        <TouchableOpacity
          style={styles.savedScriptsButton}
          onPress={() => setShowSavedScripts(!showSavedScripts)}
          activeOpacity={0.7}
        >
          <Bookmark color="#9333ea" size={20} />
          <Text style={styles.savedScriptsButtonText}>
            Сохраненные сценарии ({savedScripts.length})
          </Text>
          <ChevronRight color="#9333ea" size={20} />
        </TouchableOpacity>
      )}

      {showSavedScripts ? (
        <View>
          {savedScripts.map((script) => (
            <View key={script.id} style={styles.savedScriptCard}>
              <TouchableOpacity
                style={styles.savedScriptContent}
                onPress={() => loadScript(script)}
                activeOpacity={0.7}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.savedScriptTitle,
                      isDarkTheme && styles.savedScriptTitleDark,
                    ]}
                  >
                    {script.title}
                  </Text>
                  {script.savedAt && (
                    <Text
                      style={[
                        styles.savedScriptDate,
                        isDarkTheme && styles.savedScriptDateDark,
                      ]}
                    >
                      Сохранено:{" "}
                      {new Date(script.savedAt).toLocaleDateString("ru-RU")}
                    </Text>
                  )}
                </View>
                <ChevronRight color="#9ca3af" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteScript(script.id)}
                activeOpacity={0.7}
              >
                <Trash2 color="#ef4444" size={18} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : !generatedScript ? (
        <View>
          <View
            style={[
              styles.scriptPrompt,
              isDarkTheme && styles.scriptPromptDark,
            ]}
          >
            <Sparkles color="#9333ea" size={48} />
            <Text
              style={[
                styles.scriptPromptTitle,
                isDarkTheme && styles.scriptPromptTitleDark,
              ]}
            >
              Выберите нишу для генерации
            </Text>
            <Text
              style={[
                styles.scriptPromptText,
                isDarkTheme && styles.scriptPromptTextDark,
              ]}
            >
              AI создаст полноценный сценарий с хуком, сценами и призывом к
              действию
            </Text>
            <View style={styles.nichesList}>
              {allNiches.slice(0, 5).map((niche) => (
                <TouchableOpacity
                  key={niche.id}
                  style={[
                    styles.nicheSelectCard,
                    isDarkTheme && styles.nicheSelectCardDark,
                  ]}
                  onPress={() => generateScript(niche)}
                  disabled={loading}
                  activeOpacity={0.7}
                >
                  <View style={styles.nicheSelectContent}>
                    <Text style={styles.nicheSelectIcon}>{niche.icon}</Text>
                    <Text
                      style={[
                        styles.nicheSelectName,
                        isDarkTheme && styles.nicheSelectNameDark,
                      ]}
                    >
                      {niche.name}
                    </Text>
                  </View>
                  <ChevronRight color="#9ca3af" size={20} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {loading && (
            <View
              style={[
                styles.loadingContainer,
                isDarkTheme && styles.loadingContainerDark,
              ]}
            >
              <Text
                style={[
                  styles.loadingText,
                  isDarkTheme && styles.loadingTextDark,
                ]}
              >
                AI создаёт сценарий...
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View style={{ paddingBottom: 100 }}>
          <View style={styles.scriptHeader}>
            <Text style={styles.scriptTitle}>{generatedScript.title}</Text>
            <Text style={styles.scriptSubtitle}>
              Готовый сценарий для Shorts
            </Text>
          </View>

          {generatedScript.scenes.map((scene, idx) => (
            <View
              key={`scene-${idx}`}
              style={[styles.sceneCard, isDarkTheme && styles.sceneCardDark]}
            >
              <View style={styles.sceneHeader}>
                <View>
                  <Text
                    style={[
                      styles.sceneTime,
                      isDarkTheme && styles.sceneTimeDark,
                    ]}
                  >
                    {scene.time}
                  </Text>
                  <Text
                    style={[
                      styles.sceneType,
                      isDarkTheme && styles.sceneTypeDark,
                    ]}
                  >
                    {scene.type}
                  </Text>
                </View>
                <Play color="#9ca3af" size={20} />
              </View>
              <View style={styles.sceneContent}>
                <Text
                  style={[
                    styles.sceneLabel,
                    isDarkTheme && styles.sceneLabelDark,
                  ]}
                >
                  💬 Текст:
                </Text>
                <Text
                  style={[
                    styles.sceneText,
                    isDarkTheme && styles.sceneTextDark,
                  ]}
                >
                  {scene.text}
                </Text>
                <Text
                  style={[
                    styles.sceneLabel,
                    isDarkTheme && styles.sceneLabelDark,
                  ]}
                >
                  🎬 Визуал:
                </Text>
                <Text
                  style={[
                    styles.sceneText,
                    isDarkTheme && styles.sceneTextDark,
                  ]}
                >
                  {scene.visual}
                </Text>
                <Text
                  style={[
                    styles.sceneLabel,
                    isDarkTheme && styles.sceneLabelDark,
                  ]}
                >
                  🎵 Музыка:
                </Text>
                <Text
                  style={[
                    styles.sceneText,
                    isDarkTheme && styles.sceneTextDark,
                  ]}
                >
                  {scene.music}
                </Text>
              </View>
            </View>
          ))}

          <View style={[styles.seoCard, isDarkTheme && styles.seoCardDark]}>
            <Text style={[styles.seoTitle, isDarkTheme && styles.seoTitleDark]}>
              🏷️ SEO-оптимизация
            </Text>
            <Text style={[styles.seoLabel, isDarkTheme && styles.seoLabelDark]}>
              Теги:
            </Text>
            <View style={styles.tagsContainer}>
              {generatedScript.tags.map((tag, idx) => (
                <View key={`tag-${idx}`} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
            <Text style={[styles.seoLabel, isDarkTheme && styles.seoLabelDark]}>
              Описание:
            </Text>
            <Text style={[styles.seoText, isDarkTheme && styles.seoTextDark]}>
              {generatedScript.description}
            </Text>
            <Text style={[styles.seoLabel, isDarkTheme && styles.seoLabelDark]}>
              ⏰ Лучшее время публикации:
            </Text>
            <Text style={[styles.seoValue, isDarkTheme && styles.seoValueDark]}>
              {generatedScript.bestTime}
            </Text>
          </View>

          <View style={styles.scriptActions}>
            <TouchableOpacity
              style={[
                styles.secondaryButton,
                isDarkTheme && styles.secondaryButtonDark,
              ]}
              onPress={() => setGeneratedScript(null)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.secondaryButtonText,
                  isDarkTheme && styles.secondaryButtonTextDark,
                ]}
              >
                Новый сценарий
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={saveScript}
              activeOpacity={0.7}
            >
              <Text style={styles.primaryButtonText}>Сохранить</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );

  const AnalyticsScreen = () => (
    <ScrollView
      style={[styles.container, isDarkTheme && styles.containerDark]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text
          style={[styles.headerTitle, isDarkTheme && styles.headerTitleDark]}
        >
          Аналитика канала
        </Text>
        <Text
          style={[
            styles.headerSubtitle,
            isDarkTheme && styles.headerSubtitleDark,
          ]}
        >
          Подробная статистика и рекомендации
        </Text>
      </View>

      <View style={styles.metricsGrid}>
        <View style={[styles.metricCard, isDarkTheme && styles.metricCardDark]}>
          <Text
            style={[styles.metricLabel, isDarkTheme && styles.metricLabelDark]}
          >
            Удержание
          </Text>
          <Text
            style={[styles.metricValue, isDarkTheme && styles.metricValueDark]}
          >
            {channelStats.avgRetention}
          </Text>
          <Text style={styles.metricChange}>+5% за неделю</Text>
        </View>
        <View style={[styles.metricCard, isDarkTheme && styles.metricCardDark]}>
          <Text
            style={[styles.metricLabel, isDarkTheme && styles.metricLabelDark]}
          >
            CTR
          </Text>
          <Text
            style={[styles.metricValue, isDarkTheme && styles.metricValueDark]}
          >
            {channelStats.avgCTR}
          </Text>
          <Text style={styles.metricChange}>+1.2% за неделю</Text>
        </View>
      </View>

      <View style={[styles.chartCard, isDarkTheme && styles.chartCardDark]}>
        <View style={styles.chartHeader}>
          <TrendingUp color="#9333ea" size={20} />
          <Text
            style={[styles.chartTitle, isDarkTheme && styles.chartTitleDark]}
          >
            Рост по дням
          </Text>
        </View>

        {chartData.map(({ day, value }, idx) => (
          <View key={`chart-${day}-${idx}`} style={styles.chartRow}>
            <Text style={[styles.chartDay, isDarkTheme && styles.chartDayDark]}>
              {day}
            </Text>
            <View
              style={[
                styles.chartBarContainer,
                isDarkTheme && styles.chartBarContainerDark,
              ]}
            >
              <View style={[styles.chartBar, { width: `${value}%` }]} />
            </View>
            <Text
              style={[styles.chartValue, isDarkTheme && styles.chartValueDark]}
            >
              {Math.floor(value)}
            </Text>
          </View>
        ))}
      </View>

      <View
        style={[
          styles.recommendationsCard,
          isDarkTheme && styles.recommendationsCardDark,
        ]}
      >
        <View style={styles.recommendationsHeader}>
          <Award color="#ea580c" size={20} />
          <Text
            style={[
              styles.recommendationsTitle,
              isDarkTheme && styles.recommendationsTitleDark,
            ]}
          >
            Рекомендации для роста
          </Text>
        </View>
        <Text
          style={[
            styles.recommendationItem,
            isDarkTheme && styles.recommendationItemDark,
          ]}
        >
          → Увеличьте частоту публикаций до 3-4 видео в неделю
        </Text>
        <Text
          style={[
            styles.recommendationItem,
            isDarkTheme && styles.recommendationItemDark,
          ]}
        >
          → Работайте над удержанием первых 5 секунд
        </Text>
        <Text
          style={[
            styles.recommendationItem,
            isDarkTheme && styles.recommendationItemDark,
          ]}
        >
          → Тестируйте превью с крупным текстом
        </Text>
      </View>
    </ScrollView>
  );

  const OptimizationScreen = () => (
    <ScrollView
      style={[styles.container, isDarkTheme && styles.containerDark]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text
          style={[styles.headerTitle, isDarkTheme && styles.headerTitleDark]}
        >
          Оптимизация
        </Text>
        <Text
          style={[
            styles.headerSubtitle,
            isDarkTheme && styles.headerSubtitleDark,
          ]}
        >
          Улучшите производительность вашего канала
        </Text>
      </View>

      <View style={styles.optimizationCard}>
        <Text style={styles.optimizationIcon}>🎯</Text>
        <Text style={styles.optimizationTitle}>Анализ заголовков</Text>
        <Text style={styles.optimizationText}>
          Проверьте эффективность ваших заголовков и получите рекомендации
        </Text>
        <TouchableOpacity style={styles.optimizationButton} activeOpacity={0.7}>
          <Text style={styles.optimizationButtonText}>Анализировать</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optimizationCard}>
        <Text style={styles.optimizationIcon}>🖼️</Text>
        <Text style={styles.optimizationTitle}>Тест превью</Text>
        <Text style={styles.optimizationText}>
          A/B тестирование превью для максимального CTR
        </Text>
        <TouchableOpacity style={styles.optimizationButton} activeOpacity={0.7}>
          <Text style={styles.optimizationButtonText}>Начать тест</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optimizationCard}>
        <Text style={styles.optimizationIcon}>⏰</Text>
        <Text style={styles.optimizationTitle}>Оптимальное время</Text>
        <Text style={styles.optimizationText}>
          Узнайте лучшее время для публикации ваших видео
        </Text>
        <TouchableOpacity style={styles.optimizationButton} activeOpacity={0.7}>
          <Text style={styles.optimizationButtonText}>Узнать</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optimizationCard}>
        <Text style={styles.optimizationIcon}>🏷️</Text>
        <Text style={styles.optimizationTitle}>SEO аудит</Text>
        <Text style={styles.optimizationText}>
          Полный анализ SEO вашего канала и видео
        </Text>
        <TouchableOpacity style={styles.optimizationButton} activeOpacity={0.7}>
          <Text style={styles.optimizationButtonText}>Провести аудит</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <View style={[styles.app, isDarkTheme && styles.appDark]}>
      {/* Header */}
      <View style={[styles.appHeader, isDarkTheme && styles.appHeaderDark]}>
        <TouchableOpacity
          style={styles.appHeaderContent}
          onPress={() => setActiveTab("home")}
          activeOpacity={0.7}
        >
          <View style={styles.logoContainer}>
            <Camera color="#fff" size={24} />
          </View>
          <View>
            <Text style={[styles.appTitle, isDarkTheme && styles.appTitleDark]}>
              Creator AI
            </Text>
            <Text
              style={[
                styles.appSubtitle,
                isDarkTheme && styles.appSubtitleDark,
              ]}
            >
              Ваш помощник
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setMenuOpen(!menuOpen)}
          style={styles.menuButton}
        >
          {menuOpen ? (
            <X fill={iconColorMenu} stroke={iconColorMenu} size={24} />
          ) : (
            <Menu fill={iconColorMenu} stroke={iconColorMenu} size={24} />
          )}
        </TouchableOpacity>
      </View>

      {/* Menu Overlay */}
      <Modal
        visible={menuOpen}
        transparent
        animationType="none"
        onRequestClose={closeMenu}
      >
        <View style={styles.menuOverlay}>
          {/* overlay */}
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={closeMenu}
          />

          {/* menu */}
          <Animated.View
            style={[
              styles.menuContent,
              {
                paddingTop: insets.top + 16,
                paddingBottom: insets.bottom + 16,
                transform: [{ translateX: menuSlideAnim }],
              },
              isDarkTheme && styles.menuContentDark,
            ]}
          >
            <View style={styles.menuHeader}>
              <Text
                style={[styles.menuTitle, isDarkTheme && styles.menuTitleDark]}
              >
                Меню
              </Text>
              <TouchableOpacity onPress={closeMenu}>
                <X fill={iconColorMenu} stroke={iconColorMenu} size={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.menuItems}>
              <TouchableOpacity
                style={[
                  styles.menuItemLogin,
                  isDarkTheme && styles.menuItemLoginDark,
                ]}
                activeOpacity={0.7}
                onPress={() => {
                  setMenuOpen(false);
                  setShowLoginModal(true);
                }}
              >
                <LogIn color="#9333ea" size={20} />
                <Text
                  style={[
                    styles.menuItemLoginText,
                    isDarkTheme && styles.menuItemLoginTextDark,
                  ]}
                >
                  Войти в аккаунт
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                <Settings stroke={iconColorSettings} size={20} />
                <Text
                  style={[
                    styles.menuItemText,
                    isDarkTheme && styles.menuItemTextDark,
                  ]}
                >
                  Настройки
                </Text>
              </TouchableOpacity>

              <View
                style={[
                  styles.menuItemPlan,
                  isDarkTheme && styles.menuItemPlanDark,
                ]}
              >
                <Text
                  style={[
                    styles.menuItemTitle,
                    isDarkTheme && styles.menuItemTitleDark,
                  ]}
                >
                  🆓 Бесплатный план
                </Text>
                <Text
                  style={[
                    styles.menuItemSubtext,
                    isDarkTheme && styles.menuItemSubtextDark,
                  ]}
                >
                  3/5 сценариев использовано
                </Text>
              </View>
              <View style={styles.headerActions}>
                <TouchableOpacity
                  onPress={toggleTheme}
                  style={styles.themeToggleContainer}
                  activeOpacity={0.8}
                >
                  <Animated.View
                    style={[
                      styles.themeToggle,
                      {
                        backgroundColor: themeAnimValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: ["#e0e7ff", "#1e1b4b"],
                        }),
                      },
                    ]}
                  >
                    <Animated.View
                      style={[
                        styles.themeToggleCircle,
                        {
                          transform: [
                            {
                              translateX: themeAnimValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [2, 26],
                              }),
                            },
                          ],
                        },
                      ]}
                    >
                      {isDarkTheme ? (
                        <Moon color="#fbbf24" size={16} />
                      ) : (
                        <Sun color="#f59e0b" size={16} />
                      )}
                    </Animated.View>
                  </Animated.View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.menuItemPro}
                activeOpacity={0.8}
                onPress={() => {
                  setMenuOpen(false);
                  setShowProModal(true);
                }}
              >
                <Text style={styles.menuItemProText}>⭐ Перейти на Pro</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>

      {/* Pro Modal */}
      <Modal
        visible={showProModal}
        transparent={true}
        animationType="fade"
        onRequestClose={closeProModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={closeProModal}
          />
          <Animated.View
            style={[
              styles.proModalContent,
              { transform: [{ translateY: proSlideAnim }] },
              isDarkTheme && styles.proModalContentDark,
            ]}
          >
            <Animated.View
              {...proPanResponder.panHandlers}
              style={styles.modalHandle}
              hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
            >
              <View style={styles.handleBar} />
            </Animated.View>
            <Text
              style={[
                styles.proModalTitle,
                isDarkTheme && styles.proModalTitleDark,
              ]}
            >
              ⭐ Выберите план
            </Text>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: "100%" }}
            >
              <View
                style={[
                  styles.pricingCard,
                  isDarkTheme && styles.pricingCardDark,
                ]}
              >
                <Text style={styles.pricingBadge}>ПОПУЛЯРНЫЙ</Text>
                <Text
                  style={[
                    styles.pricingName,
                    isDarkTheme && styles.pricingNameDark,
                  ]}
                >
                  Pro
                </Text>
                <View style={styles.pricingPrice}>
                  <Text style={styles.pricingAmount}>$15</Text>
                  <Text
                    style={[
                      styles.pricingPeriod,
                      isDarkTheme && styles.pricingPeriodDark,
                    ]}
                  >
                    /месяц
                  </Text>
                </View>
                <View style={styles.pricingFeatures}>
                  <View style={styles.pricingFeature}>
                    <Check color="#16a34a" size={20} />
                    <Text style={[styles.pricingFeatureText, isDarkTheme && styles.pricingFeatureTextDark]}>
                      Неограниченная генерация сценариев
                    </Text>
                  </View>
                  <View style={styles.pricingFeature}>
                    <Check color="#16a34a" size={20} />
                    <Text style={[styles.pricingFeatureText, isDarkTheme && styles.pricingFeatureTextDark]}>
                      Продвинутый анализ ниш
                    </Text>
                  </View>
                  <View style={styles.pricingFeature}>
                    <Check color="#16a34a" size={20} />
                    <Text style={[styles.pricingFeatureText, isDarkTheme && styles.pricingFeatureTextDark]}>
                      Полная аналитика канала
                    </Text>
                  </View>
                  <View style={styles.pricingFeature}>
                    <Check color="#16a34a" size={20} />
                    <Text style={[styles.pricingFeatureText, isDarkTheme && styles.pricingFeatureTextDark]}>
                      SEO-оптимизация
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.pricingButton}
                  activeOpacity={0.8}
                >
                  <Text style={styles.pricingButtonText}>
                    Оформить подписку
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={[
                  styles.pricingCard,
                  styles.pricingCardBusiness,
                  isDarkTheme && styles.pricingCardDark,
                ]}
              >
                <Text
                  style={[
                    styles.pricingName,
                    isDarkTheme && styles.pricingNameDark,
                  ]}
                >
                  Business
                </Text>
                <View style={styles.pricingPrice}>
                  <Text style={styles.pricingAmount}>$35</Text>
                  <Text
                    style={[
                      styles.pricingPeriod,
                      isDarkTheme && styles.pricingPeriodDark,
                    ]}
                  >
                    /месяц
                  </Text>
                </View>
                <View style={styles.pricingFeatures}>
                  <View style={styles.pricingFeature}>
                    <Check color="#16a34a" size={20} />
                    <Text style={[styles.pricingFeatureText, isDarkTheme && styles.pricingFeatureTextDark]}>Всё из Pro +</Text>
                  </View>
                  <View style={styles.pricingFeature}>
                    <Check color="#16a34a" size={20} />
                    <Text style={[styles.pricingFeatureText, isDarkTheme && styles.pricingFeatureTextDark]}>
                      Управление несколькими каналами
                    </Text>
                  </View>
                  <View style={styles.pricingFeature}>
                    <Check color="#16a34a" size={20} />
                    <Text style={[styles.pricingFeatureText, isDarkTheme && styles.pricingFeatureTextDark]}>
                      Приоритетная поддержка
                    </Text>
                  </View>
                  <View style={styles.pricingFeature}>
                    <Check color="#16a34a" size={20} />
                    <Text style={[styles.pricingFeatureText, isDarkTheme && styles.pricingFeatureTextDark]}>API доступ</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.pricingButtonOutline]}
                  activeOpacity={0.8}
                >
                  <Text style={styles.pricingButtonOutlineText}>
                    Оформить подписку
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>

      {/* Login Modal */}
      <Modal
        visible={showLoginModal}
        transparent={true}
        animationType="fade"
        onRequestClose={closeLoginModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={closeLoginModal}
          />
          <Animated.View
            style={[
              styles.loginModalContent,
              { transform: [{ translateY: loginSlideAnim }] },
              isDarkTheme && styles.loginModalContentDark,
            ]}
          >
            <Animated.View
              {...loginPanResponder.panHandlers}
              style={styles.modalHandle}
              hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
            >
              <View style={styles.handleBar} />
            </Animated.View>
            <Text
              style={[
                styles.loginModalTitle,
                isDarkTheme && styles.loginModalTitleDark,
              ]}
            >
              🔐 Вход в аккаунт
            </Text>
            <Text
              style={[
                styles.loginModalSubtitle,
                isDarkTheme && styles.loginModalSubtitleDark,
              ]}
            >
              Войдите, чтобы синхронизировать данные
            </Text>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: "100%" }}
            >
              <View style={styles.loginForm}>
                <View style={styles.inputGroup}>
                  <Text
                    style={[
                      styles.inputLabel,
                      isDarkTheme && styles.inputLabelDark,
                    ]}
                  >
                    Email
                  </Text>
                  <TextInput
                    style={[styles.input, isDarkTheme && styles.inputDark]}
                    placeholder="your@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text
                    style={[
                      styles.inputLabel,
                      isDarkTheme && styles.inputLabelDark,
                    ]}
                  >
                    Пароль
                  </Text>
                  <TextInput
                    style={[styles.input, isDarkTheme && styles.inputDark]}
                    placeholder="••••••••"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <TouchableOpacity
                  style={styles.loginButton}
                  activeOpacity={0.8}
                >
                  <Text style={styles.loginButtonText}>Войти</Text>
                </TouchableOpacity>

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>или</Text>
                  <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity
                  style={[
                    styles.socialButton,
                    isDarkTheme && styles.socialButtonDark,
                  ]}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.socialButtonText,
                      isDarkTheme && styles.socialButtonTextDark,
                    ]}
                  >
                    🔷 Войти через Google
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.socialButton,
                    isDarkTheme && styles.socialButtonDark,
                  ]}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.socialButtonText,
                      isDarkTheme && styles.socialButtonTextDark,
                    ]}
                  >
                    📘 Войти через Facebook
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.forgotPassword}>Забыли пароль?</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === "home" && <HomeScreen />}
        {activeTab === "niches" && <NichesScreen />}
        {activeTab === "scripts" && <ScriptsScreen />}
        {activeTab === "analytics" && <AnalyticsScreen />}
        {activeTab === "optimization" && <OptimizationScreen />}
      </View>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, isDarkTheme && styles.bottomNavDark]}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab("home")}
          activeOpacity={0.7}
        >
          <Camera
            color={activeTab === "home" ? "#9333ea" : "#9ca3af"}
            size={24}
          />
          <Text
            style={[
              styles.navText,
              activeTab === "home" && styles.navTextActive,
            ]}
          >
            Главная
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab("niches")}
          activeOpacity={0.7}
        >
          <Search
            color={activeTab === "niches" ? "#9333ea" : "#9ca3af"}
            size={24}
          />
          <Text
            style={[
              styles.navText,
              activeTab === "niches" && styles.navTextActive,
            ]}
          >
            Ниши
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab("scripts")}
          activeOpacity={0.7}
        >
          <FileText
            color={activeTab === "scripts" ? "#9333ea" : "#9ca3af"}
            size={24}
          />
          <Text
            style={[
              styles.navText,
              activeTab === "scripts" && styles.navTextActive,
            ]}
          >
            Сценарии
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab("analytics")}
          activeOpacity={0.7}
        >
          <BarChart3
            color={activeTab === "analytics" ? "#9333ea" : "#9ca3af"}
            size={24}
          />
          <Text
            style={[
              styles.navText,
              activeTab === "analytics" && styles.navTextActive,
            ]}
          >
            Аналитика
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  themeToggleContainer: {
    padding: 4,
  },
  themeToggle: {
    width: 56,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  themeToggleCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  app: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  appDark: {
    flex: 1,
    backgroundColor: "#333333",
  },
  appHeader: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  appHeaderDark: {
    backgroundColor: "#1f1f1f",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#313233",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoContainer: {
    backgroundColor: "#ec4899",
    padding: 8,
    borderRadius: 12,
  },
  appTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  appTitleDark: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#c7d3e4",
  },

  appSubtitle: {
    fontSize: 12,
    color: "#6b7280",
  },
  appSubtitleDark: {
    fontSize: 12,
    color: "#9fa2aa",
  },
  menuButton: {
    padding: 8,
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  menuContent: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: "#fff",

    paddingHorizontal: 24,
    paddingTop: 16, // базовый
    paddingBottom: 16,

    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },

  menuContentDark: {
    backgroundColor: "#333333",
  },

  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },
  menuTitleDark: {
    color: "#ebebeb",
  },
  menuItems: {
    gap: 8,
  },
  menuItemLogin: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#faf5ff",
    borderWidth: 1,
    borderColor: "#e9d5ff",
    marginBottom: 8,
  },
  menuItemLoginDark: {
    backgroundColor: "#4e4e4e",
  },
  menuItemLoginText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9333ea",
  },
  menuItemLoginTextDark: {
    color: "#d4d4d4",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
  menuItemTextDark: {
    color: "#ddd",
  },
  menuItemPlan: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#f9fafb",
  },
  menuItemPlanDark: { backgroundColor: "#4e4e4e" },
  menuItemTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },

  menuItemTitleDark: {
    color: "#f0f0f0",
  },
  menuItemSubtext: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  menuItemSubtextDark: {
    color: "#d6d6d6",
  },
  menuItemPro: {
    backgroundColor: "#9333ea",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  menuItemProText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  headerActions: {},
  themeButton: {},
  content: {
    flex: 1,
  },
  fullScreen: {
    flex: 1,
    padding: 24,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  scrollContent: {
    flex: 1,
  },
  statsCard: {
    backgroundColor: "#ec4899",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  statsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  statsSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 16,
    marginTop: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 12,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 12,
  },
  sectionTitleDark: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e6e6e6",
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  actionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    width: (width - 60) / 2,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionCardDark: {
    backgroundColor: "#2c2c2c",
    borderRadius: 12,
    padding: 16,
    width: (width - 60) / 2,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1f2937",
    marginTop: 8,
    textAlign: "center",
  },
  actionTextDark: {
    fontSize: 12,
    fontWeight: "600",
    color: "#dddddd",
    marginTop: 8,
    textAlign: "center",
  },
  TipCarouselContainer: {
    backgroundColor: "#faf5ff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e9d5ff",
    marginBottom: 24,
  },
  tipCard: {},
  tipContent: {
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  tipText: {
    fontSize: 12,
    color: "#4b5563",
  },
  tipFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  tipLink: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9333ea",
  },
  dotsContainer: {
    flexDirection: "row",
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#d8b4fe",
  },
  dotActive: {
    width: 16,
    backgroundColor: "#9333ea",
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  headerTitleDark: {
    color: "#eeeeee",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  headerSubtitleDark: {
    color: "#d4d4d4",
  },
  searchContainer: {
    position: "relative",
    marginBottom: 16,
  },
  searchIcon: {
    position: "absolute",
    left: 16,
    top: 13,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingLeft: 48,
    paddingRight: 16,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    color: "#5c5c5c",
  },
  searchInputDark: {
    backgroundColor: "#5c5c5c",
    borderColor: "#2b2b2b",
    color: "#e0e0e0",
  },
  emptyState: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyStateDark: {
    backgroundColor: "#5c5c5c",
  },
  emptyText: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 12,
  },
  emptyTextDark: {
    color: "#f3f3f3",
  },
  emptySubtext: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 4,
  },
  emptySubtextDark: {
    color: "#cacaca",
  },
  nichesList: {
    gap: 12,
  },
  nicheCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nicheCardDark: {
    backgroundColor: "#5c5c5c",
  },
  nicheHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  nicheInfo: {
    flexDirection: "row",
    gap: 12,
    flex: 1,
  },
  nicheIcon: {
    fontSize: 32,
  },
  nicheName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  nicheNameDark: {
    color: "#f0f0f0",
  },
  competitionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  badgeGreen: {
    backgroundColor: "#dcfce7",
  },
  badgeYellow: {
    backgroundColor: "#fef3c7",
  },
  badgeOrange: {
    backgroundColor: "#fed7aa",
  },
  badgeRed: {
    backgroundColor: "#fee2e2",
  },
  competitionText: {
    fontSize: 10,
  },
  textGreen: {
    color: "#15803d",
  },
  textYellow: {
    color: "#a16207",
  },
  textOrange: {
    color: "#c2410c",
  },
  textRed: {
    color: "#b91c1c",
  },
  nicheStats: {
    flexDirection: "row",
    gap: 12,
  },
  nicheStat: {
    flex: 1,
  },
  nicheStatLabel: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 2,
  },
  nicheStatLabelDark: {
    color: "#f0f0f0",
  },
  nicheStatValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1f2937",
  },
  nicheStatValueDark: {
    color: "#dfdfdf",
  },
  nicheStatValueGreen: {
    fontSize: 12,
    fontWeight: "600",
    color: "#16a34a",
  },
  nicheStatValueGreenDark: {
    color: "#16a34a",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "80%",
  },

  modalHandle: {
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },

  handleBar: {
    width: 48,
    height: 4,
    backgroundColor: "#d1d5db",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 24,
    zIndex: 100,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  modalIcon: {
    fontSize: 40,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },
  modalBody: {
    marginBottom: 24,
  },
  modalSection: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  modalSectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  modalGrid: {
    flexDirection: "row",
    gap: 12,
  },
  modalLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  modalValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f2937",
  },
  modalValueGreen: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#16a34a",
  },
  recommendation: {
    fontSize: 12,
    color: "#4b5563",
    marginBottom: 4,
  },
  modalButton: {
    backgroundColor: "#9333ea",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  savedScriptsButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#faf5ff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e9d5ff",
  },
  savedScriptsButtonText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#9333ea",
  },
  savedScriptCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  savedScriptContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  savedScriptTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  savedScriptDate: {
    fontSize: 10,
    color: "#6b7280",
  },
  deleteButton: {
    padding: 8,
  },
  scriptPrompt: {
    backgroundColor: "#faf5ff",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#e9d5ff",
    marginBottom: 16,
  },
  scriptPromptTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 16,
    marginBottom: 8,
  },
  scriptPromptText: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 16,
  },
  nicheSelectCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  nicheSelectContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  nicheSelectIcon: {
    fontSize: 24,
  },
  nicheSelectName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
  loadingContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
  },
  scriptHeader: {
    backgroundColor: "#9333ea",
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  },
  scriptTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  scriptSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },
  sceneCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sceneCardDark: {
    backgroundColor: "rgb(45 45 45)",
  },
  sceneHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  sceneTime: {
    fontSize: 10,
    fontWeight: "600",
    color: "#9333ea",
    marginBottom: 4,
  },
  sceneTimeDark: {
    color: "#b567ff",
  },
  sceneType: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1f2937",
  },
  sceneTypeDark: {
    color: "#9ca3af",
  },
  sceneContent: {
    gap: 8,
  },
  sceneLabel: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 2,
  },
  sceneLabelDark: {
    color: "#9ca3af",
  },
  sceneText: {
    fontSize: 12,
    color: "#374151",
    marginBottom: 8,
  },
  sceneTextDark: {
    color: "#f0f0f0",
  },
  seoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  seoCardDark: {
    backgroundColor: "rgb(45 45 45)",
  },
  seoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 12,
  },
  seoLabel: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 4,
    marginTop: 8,
  },
  seoTitleDark: {
    color: "#9ca3af",
  },
  seoLabelDark: {
    color: "#f0f0f0",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: "#f3e8ff",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 10,
    color: "#7c3aed",
  },
  seoText: {
    fontSize: 12,
    color: "#374151",
    marginBottom: 8,
  },
  seoValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },
  seoTextDark: {
    color: "#9ca3af",
  },
  seoValueDark: {
    color: "#9ca3af",
  },
  scriptActions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#9333ea",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  metricsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },
  metricChange: {
    fontSize: 10,
    color: "#16a34a",
    marginTop: 4,
  },
  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
  chartRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  chartDay: {
    fontSize: 10,
    color: "#6b7280",
    width: 24,
  },
  chartBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
  },
  chartBar: {
    height: 8,
    backgroundColor: "#9333ea",
    borderRadius: 4,
  },
  chartValue: {
    fontSize: 10,
    fontWeight: "600",
    color: "#374151",
    width: 48,
    textAlign: "right",
  },
  recommendationsCard: {
    backgroundColor: "#fff7ed",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#fed7aa",
  },
  recommendationsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  recommendationsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
  recommendationItem: {
    fontSize: 12,
    color: "#374151",
    marginBottom: 8,
  },
  optimizationCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optimizationIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  optimizationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  optimizationText: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 16,
  },
  optimizationButton: {
    backgroundColor: "#9333ea",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  optimizationButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  proModalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "90%",
  },
  proModalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 24,
  },
  pricingCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#9333ea",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  pricingCardBusiness: {
    borderColor: "#e5e7eb",
  },
  pricingBadge: {
    backgroundColor: "#9333ea",
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  pricingName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  pricingPrice: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 20,
  },
  pricingAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#9333ea",
  },
  pricingPeriod: {
    fontSize: 16,
    color: "#6b7280",
    marginLeft: 4,
  },
  pricingFeatures: {
    gap: 12,
    marginBottom: 20,
  },
  pricingFeature: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  pricingFeatureText: {
    fontSize: 14,
    color: "#4b5563",
    flex: 1,
  },
  pricingButton: {
    backgroundColor: "#9333ea",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  pricingButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  pricingButtonOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#9333ea",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  pricingButtonOutlineText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9333ea",
  },
  loginModalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "90%",
  },
  loginModalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 8,
  },
  loginModalSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
  },
  loginForm: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: "#1f2937",
  },
  loginButton: {
    backgroundColor: "#9333ea",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  loginButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  dividerText: {
    fontSize: 12,
    color: "#6b7280",
  },
  socialButton: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  forgotPassword: {
    fontSize: 12,
    color: "#9333ea",
    textAlign: "center",
    marginTop: 8,
  },
  closeModalButton: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  closeModalButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  bottomNavDark: {
    flexDirection: "row",
    backgroundColor: "rgb(31 31 31)",
    borderTopWidth: 1,
    borderTopColor: "rgb(49 50 51)",
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  navText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#9ca3af",
    marginTop: 4,
  },
  navTextActive: {
    color: "#9333ea",
  },
  // ========== НЕДОСТАЮЩИЕ DARK СТИЛИ ==========

  // Container & Full Screen
  containerDark: {
    flex: 1,
    padding: 24,
    backgroundColor: "#333333",
  },
  fullScreenDark: {
    flex: 1,
    padding: 24,
    backgroundColor: "#333333",
  },

  // Modal Content
  modalContentDark: {
    backgroundColor: "#2c2c2c",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "80%",
  },
  modalTitleDark: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f0f0f0",
  },
  modalSectionDark: {
    backgroundColor: "#3a3a3a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  modalSectionTitleDark: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f0f0f0",
    marginBottom: 8,
  },
  modalLabelDark: {
    fontSize: 12,
    color: "#9ca3af",
    marginBottom: 4,
  },
  modalValueDark: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#e0e0e0",
  },
  recommendationDark: {
    fontSize: 12,
    color: "#d1d5db",
    marginBottom: 4,
  },

  // Saved Scripts
  savedScriptsButtonDark: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#4e4e4e",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#6b7280",
  },
  savedScriptsButtonActive: {
    backgroundColor: "#9333ea",
    borderColor: "#9333ea",
  },
  savedScriptsButtonTextActive: {
    color: "#fff",
  },
  savedScriptCardDark: {
    backgroundColor: "#2c2c2c",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  savedScriptTitleDark: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f0f0f0",
    marginBottom: 4,
  },
  savedScriptDateDark: {
    fontSize: 10,
    color: "#9ca3af",
  },

  // Script Prompt
  scriptPromptDark: {
    backgroundColor: "#4e4e4e",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#6b7280",
    marginBottom: 16,
  },
  scriptPromptTitleDark: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f0f0f0",
    marginTop: 16,
    marginBottom: 8,
  },
  scriptPromptTextDark: {
    fontSize: 12,
    color: "#d1d5db",
    marginBottom: 16,
  },

  // Niche Select
  nicheSelectCardDark: {
    backgroundColor: "#3a3a3a",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#4b5563",
  },
  nicheSelectNameDark: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f0f0f0",
  },

  // Loading
  loadingContainerDark: {
    backgroundColor: "#2c2c2c",
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingTextDark: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9ca3af",
  },

  // Secondary Button
  secondaryButtonDark: {
    flex: 1,
    backgroundColor: "#4e4e4e",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryButtonTextDark: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f0f0f0",
  },

  // Metrics
  metricCardDark: {
    flex: 1,
    backgroundColor: "#2c2c2c",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  metricLabelDark: {
    fontSize: 12,
    color: "#9ca3af",
    marginBottom: 4,
  },
  metricValueDark: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f0f0f0",
  },

  // Chart
  chartCardDark: {
    backgroundColor: "#2c2c2c",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitleDark: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f0f0f0",
  },
  chartDayDark: {
    fontSize: 10,
    color: "#9ca3af",
    width: 24,
  },
  chartBarContainerDark: {
    flex: 1,
    height: 8,
    backgroundColor: "#4e4e4e",
    borderRadius: 4,
  },
  chartValueDark: {
    fontSize: 10,
    fontWeight: "600",
    color: "#d1d5db",
    width: 48,
    textAlign: "right",
  },

  // Recommendations
  recommendationsCardDark: {
    backgroundColor: "#7c2d12",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ea580c",
  },
  recommendationsTitleDark: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f9fafb",
  },
  recommendationItemDark: {
    fontSize: 12,
    color: "#d1d5db",
    marginBottom: 8,
  },

  // Optimization
  optimizationCardDark: {
    backgroundColor: "#2c2c2c",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  optimizationTitleDark: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f0f0f0",
    marginBottom: 8,
  },
  optimizationTextDark: {
    fontSize: 12,
    color: "#9ca3af",
    marginBottom: 16,
  },

  // Pro Modal
  proModalContentDark: {
    backgroundColor: "#2c2c2c",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "90%",
  },
  proModalTitleDark: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f9fafb",
    textAlign: "center",
    marginBottom: 24,
  },
  pricingCardDark: {
    backgroundColor: "#3a3a3a",
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#9333ea",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  pricingNameDark: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f9fafb",
    marginBottom: 8,
  },
  pricingPeriodDark: {
    fontSize: 16,
    color: "#9ca3af",
    marginLeft: 4,
  },
  pricingFeatureTextDark: {
    fontSize: 14,
    color: "#d1d5db",
    flex: 1,
  },


  // Login Modal
  loginModalContentDark: {
    backgroundColor: "#2c2c2c",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "90%",
  },
  loginModalTitleDark: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f9fafb",
    textAlign: "center",
    marginBottom: 8,
  },
  loginModalSubtitleDark: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
    marginBottom: 24,
  },
  inputLabelDark: {
    fontSize: 14,
    fontWeight: "600",
    color: "#d1d5db",
  },
  inputDark: {
    backgroundColor: "#374151",
    borderWidth: 1,
    borderColor: "#4b5563",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: "#f9fafb",
  },
  dividerLineDark: {
    flex: 1,
    height: 1,
    backgroundColor: "#4b5563",
  },
  dividerTextDark: {
    fontSize: 12,
    color: "#9ca3af",
  },
  socialButtonDark: {
    backgroundColor: "#374151",
    borderWidth: 1,
    borderColor: "#4b5563",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  socialButtonTextDark: {
    fontSize: 14,
    fontWeight: "600",
    color: "#d1d5db",
  },
  registerLinkDark: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
  },

  // Settings Modal
  settingsModalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  settingsModalContent: {
    backgroundColor: "#fff",
    borderRadius: 24,
    width: "90%",
    height: "90%",
    padding: 24,
  },
  settingsModalContentDark: {
    backgroundColor: "#2c2c2c",
  },
  settingsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  settingsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },
  settingsTitleDark: {
    color: "#f9fafb",
  },
  settingsContent: {
    flex: 1,
  },
  settingsSection: {
    marginBottom: 24,
  },
  settingsSectionDark: {
    marginBottom: 24,
  },
  settingsSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 12,
  },
  settingsSectionTitleDark: {
    color: "#f9fafb",
  },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingsItemDark: {
    backgroundColor: "#374151",
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  settingsItemText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
  settingsItemTextDark: {
    color: "#f9fafb",
  },
  settingsItemValue: {
    fontSize: 14,
    color: "#6b7280",
  },
  settingsItemValueDark: {
    color: "#9ca3af",
  },
  settingsToggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  settingsToggleActive: {
    backgroundColor: "#9333ea",
  },
  settingsToggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  settingsToggleCircleActive: {
    alignSelf: "flex-end",
  },

  themeButtonContainer: {
    marginRight: 8,
  },
  themeButtonGradient: {
    width: 64,
    height: 34,
    borderRadius: 17,
    position: "relative",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  themeButtonGradientLight: {
    backgroundColor: "#93c5fd",
  },
  themeButtonGradientDark: {
    backgroundColor: "#1e3a8a",
  },
  themeButtonSlider: {
    position: "absolute",
    top: 2,
    left: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
    zIndex: 10,
  },
  themeEmoji: {
    fontSize: 16,
  },
  themeButtonIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 6,
    height: "100%",
  },
  themeButtonIcon: {
    fontSize: 14,
    opacity: 0.4,
  },
  themeButtonIconActive: {
    opacity: 0,
  },
  registerLinkBold: {
    fontWeight: "600",
    color: "#9333ea",
  },

  // Navigation Text Dark
  navTextDark: {
    fontSize: 10,
    fontWeight: "600",
    color: "#6b7280",
    marginTop: 4,
  },
});

export default YouTubeCreatorApp;
