<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal" @keydown.esc="closeModal">
    <div
      class="modal-content"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      @click.stop
    >
      <div class="modal-header">
        <h2 id="modal-title" class="modal-title">💡 {{ labels.learnTrakli }}</h2>
        <button class="close-btn" :aria-label="labels.closeModal" @click="closeModal">
          <XMarkIcon class="close-icon" />
        </button>
      </div>

      <div class="modal-body">
        <div class="learning-tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="tab-button"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            <component :is="tab.icon" class="tab-icon" />
            {{ tab.label }}
          </button>
        </div>

        <div class="tab-content">
          <div v-if="activeTab === 'concepts'" class="concepts-section">
            <h3 class="section-title">{{ labels.coreConcepts }}</h3>
            <div class="concept-cards">
              <div v-for="concept in concepts" :key="concept.title" class="concept-card">
                <div class="concept-header">
                  <component :is="concept.icon" class="concept-icon" />
                  <h4 class="concept-title">{{ concept.title }}</h4>
                </div>
                <p class="concept-description">{{ concept.description }}</p>
                <div class="concept-tips">
                  <span class="tips-label">💡 {{ labels.tips }}:</span>
                  <ul class="tips-list">
                    <li v-for="tip in concept.tips" :key="tip">{{ tip }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'tips'" class="tips-section">
            <h3 class="section-title">{{ labels.quickTips }}</h3>
            <div class="tips-grid">
              <div v-for="tip in quickTips" :key="tip.title" class="tip-card">
                <div class="tip-emoji">{{ tip.emoji }}</div>
                <h4 class="tip-title">{{ tip.title }}</h4>
                <p class="tip-text">{{ tip.text }}</p>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'shortcuts'" class="shortcuts-section">
            <h3 class="section-title">{{ labels.keyboardShortcuts }}</h3>
            <div class="shortcuts-list">
              <div v-for="shortcut in shortcuts" :key="shortcut.action" class="shortcut-item">
                <div class="shortcut-keys">
                  <kbd v-for="key in shortcut.keys" :key="key" class="key">{{ key }}</kbd>
                </div>
                <span class="shortcut-action">{{ shortcut.action }}</span>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'faq'" class="faq-section">
            <h3 class="section-title">{{ labels.faq }}</h3>
            <div class="faq-list">
              <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
                <button
                  class="faq-question"
                  :class="{ open: openFaq === index }"
                  @click="toggleFaq(index)"
                >
                  {{ faq.question }}
                  <ChevronDownIcon class="faq-chevron" />
                </button>
                <div v-if="openFaq === index" class="faq-answer">
                  {{ faq.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  XMarkIcon,
  ChevronDownIcon,
  CreditCardIcon,
  TagIcon,
  ArrowsRightLeftIcon,
  UsersIcon,
  AcademicCapIcon,
  LightBulbIcon,
  CommandLineIcon,
  QuestionMarkCircleIcon
} from '@heroicons/vue/24/outline';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  labels: {
    type: Object,
    default: () => ({
      learnTrakli: 'Learn Trakli',
      closeModal: 'Close modal',
      coreConcepts: 'Core Concepts',
      tips: 'Tips',
      quickTips: 'Quick Tips',
      keyboardShortcuts: 'Keyboard Shortcuts',
      faq: 'Frequently Asked Questions',
      tabs: {
        concepts: 'Concepts',
        tips: 'Tips',
        shortcuts: 'Shortcuts',
        faq: 'FAQ'
      },
      learn: {
        transactions: {
          title: 'Transactions',
          description: 'learn.transactions.description',
          tips: [
            'learn.transactions.tip1',
            'learn.transactions.tip2',
            'learn.transactions.tip3'
          ]
        },
        wallets: {
          title: 'Wallets',
          description: 'learn.wallets.description',
          tips: ['learn.wallets.tip1', 'learn.wallets.tip2', 'learn.wallets.tip3']
        },
        categories: {
          title: 'Categories',
          description: 'learn.categories.description',
          tips: ['learn.categories.tip1', 'learn.categories.tip2', 'learn.categories.tip3']
        },
        parties: {
          title: 'Parties',
          description: 'learn.parties.description',
          tips: ['learn.parties.tip1', 'learn.parties.tip2', 'learn.parties.tip3']
        }
      },
      quickTipsList: [
        { emoji: '⚡', title: 'Quick Entry', text: 'learn.quicktips.quickentry' },
        { emoji: '📊', title: 'Dashboard Overview', text: 'learn.quicktips.dashboard' },
        { emoji: '🔍', title: 'Search & Filter', text: 'learn.quicktips.search' },
        { emoji: '📱', title: 'Mobile Friendly', text: 'learn.quicktips.mobile' },
        { emoji: '🎯', title: 'Be Consistent', text: 'learn.quicktips.consistent' },
        { emoji: '💡', title: 'Start Simple', text: 'learn.quicktips.simple' }
      ],
      shortcutsList: [
        { keys: ['Ctrl', '+'], action: 'Add new transaction' },
        { keys: ['Ctrl', '/'], action: 'Open search' },
        { keys: ['Ctrl', 'D'], action: 'Go to dashboard' },
        { keys: ['Esc'], action: 'Close modals/dropdowns' },
        { keys: ['?'], action: 'Open this help modal' }
      ],
      faqs: [
        { question: 'learn.faq.q1', answer: 'learn.faq.a1' },
        { question: 'learn.faq.q2', answer: 'learn.faq.a2' },
        { question: 'learn.faq.q3', answer: 'learn.faq.a3' },
        { question: 'learn.faq.q4', answer: 'learn.faq.a4' },
        { question: 'learn.faq.q5', answer: 'learn.faq.a5' },
        { question: 'learn.faq.q6', answer: 'learn.faq.a6' }
      ]
    })
  }
});

const emit = defineEmits(['close']);

const activeTab = ref('concepts');
const openFaq = ref(null);

const tabs = computed(() => [
  { id: 'concepts', label: props.labels.tabs.concepts, icon: AcademicCapIcon },
  { id: 'tips', label: props.labels.tabs.tips, icon: LightBulbIcon },
  { id: 'shortcuts', label: props.labels.tabs.shortcuts, icon: CommandLineIcon },
  { id: 'faq', label: props.labels.tabs.faq, icon: QuestionMarkCircleIcon }
]);

const concepts = computed(() => [
  {
    title: props.labels.learn.transactions.title,
    icon: ArrowsRightLeftIcon,
    description: props.labels.learn.transactions.description,
    tips: props.labels.learn.transactions.tips
  },
  {
    title: props.labels.learn.wallets.title,
    icon: CreditCardIcon,
    description: props.labels.learn.wallets.description,
    tips: props.labels.learn.wallets.tips
  },
  {
    title: props.labels.learn.categories.title,
    icon: TagIcon,
    description: props.labels.learn.categories.description,
    tips: props.labels.learn.categories.tips
  },
  {
    title: props.labels.learn.parties.title,
    icon: UsersIcon,
    description: props.labels.learn.parties.description,
    tips: props.labels.learn.parties.tips
  }
]);

const quickTips = computed(() => props.labels.quickTipsList);

const shortcuts = computed(() => props.labels.shortcutsList);

const faqs = computed(() => props.labels.faqs);

const closeModal = () => {
  emit('close');
};

const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index;
};
</script>

<style scoped lang="scss">
@use '../assets/scss/_vars.scss' as *;

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: $z-index-modal;
  padding: 1rem;
}

.modal-content {
  background: $bg-white;
  border-radius: $radius-xl;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: $shadow-xl;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid $border-gray;
  background: $primary-light;

  @media (max-width: $breakpoint-sm) {
    padding: 1rem 1.5rem;
  }
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: $text-primary;
  margin: 0;

  @media (max-width: $breakpoint-sm) {
    font-size: 1.25rem;
  }
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: $radius-lg;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(var(--color-primary-rgb), 0.15);
  }
}

.close-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: $text-secondary;
}

.modal-body {
  overflow-y: auto;
  max-height: calc(90vh - 100px);
}

.learning-tabs {
  display: flex;
  border-bottom: 1px solid $border-gray;
  background: $bg-slate;
  padding: 0 2rem;

  @media (max-width: $breakpoint-sm) {
    padding: 0 1rem;
    overflow-x: auto;
  }
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  color: $text-secondary;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  .tab-icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  &:hover {
    color: $primary;
    background: rgba(var(--color-primary-rgb), 0.05);
  }

  &.active {
    color: $primary;
    border-bottom-color: $primary;
    background: $bg-white;
  }

  @media (max-width: $breakpoint-sm) {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }
}

.tab-content {
  padding: 2rem;

  @media (max-width: $breakpoint-sm) {
    padding: 1.5rem;
  }
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: $text-primary;
  margin: 0 0 1.5rem 0;
}

.concept-cards {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.concept-card {
  background: $bg-slate;
  border: 1px solid $border-gray;
  border-radius: $radius-xl;
  padding: 1.5rem;
  border-left: 4px solid $primary;
}

.concept-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.concept-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: $primary;
}

.concept-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: $text-primary;
  margin: 0;
}

.concept-description {
  color: $text-secondary;
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.concept-tips {
  .tips-label {
    font-weight: 600;
    color: $primary;
    font-size: 0.875rem;
  }
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0 0;

  li {
    color: $text-secondary;
    font-size: 0.875rem;
    padding: 0.25rem 0;
    position: relative;
    padding-left: 1rem;

    &::before {
      content: '•';
      color: $primary;
      font-weight: bold;
      position: absolute;
      left: 0;
    }
  }
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.tip-card {
  background: $bg-white;
  border: 1px solid $border-gray;
  border-radius: $radius-xl;
  padding: 1.5rem;
  text-align: center;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-md;
  }
}

.tip-emoji {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.tip-title {
  font-size: 1rem;
  font-weight: 600;
  color: $text-primary;
  margin: 0 0 0.5rem 0;
}

.tip-text {
  color: $text-secondary;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
}

.shortcuts-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.shortcut-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: $bg-slate;
  border-radius: $radius-lg;
  border: 1px solid $border-gray;
}

.shortcut-keys {
  display: flex;
  gap: 0.25rem;
}

.key {
  background: $bg-white;
  border: 1px solid $border-light;
  border-radius: $radius-sm;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: $text-primary;
  box-shadow: $shadow-sm;
}

.shortcut-action {
  color: $text-secondary;
  font-size: 0.875rem;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.faq-item {
  border: 1px solid $border-gray;
  border-radius: $radius-lg;
  overflow: hidden;
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: $bg-slate;
  border: none;
  text-align: left;
  font-weight: 500;
  color: $text-primary;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: $bg-card;
  }

  &.open {
    background: $bg-white;
  }
}

.faq-chevron {
  width: 1rem;
  height: 1rem;
  color: $text-secondary;
  transition: transform 0.2s ease;

  .faq-question.open & {
    transform: rotate(180deg);
  }
}

.faq-answer {
  padding: 1rem;
  background: $bg-white;
  color: $text-secondary;
  line-height: 1.6;
  border-top: 1px solid $border-gray;
}
</style>
