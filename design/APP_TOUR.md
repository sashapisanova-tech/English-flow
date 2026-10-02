# English Flow — App Tour

Design brief for the first-run tour and the in-app tips. Use the Flow series design
(Union: navy for actions, UK red for progress and highlights; Lora + DM Sans; cream
background; the "drop cap" logo). Phone first (390×844), and a laptop variant
(1280×840) where the layout differs.

---

## 1. What the tour must achieve

The tour isn't a manual. Its job is to get a new learner to **finish their first story
and set a daily goal** in the first session, and to understand *why* the app works,
so they come back tomorrow.

Success = within the first visit the learner:
1. has chosen a daily goal (minutes),
2. has opened and read their first text,
3. has tapped at least one word and added it to their cards.

## 2. Principles (why the tour is built this way)

| Principle | What it means for the design |
|---|---|
| **Low cognitive load** | One idea per screen, max ~25 words of body text, one visual. 6 steps, never more. A progress indicator ("2 of 6") so the end is visible. |
| **Show, don't tell** | Every step shows a live-looking mini version of the real screen (animated tap, word highlighting, a card flipping), not an illustration of an idea. |
| **Time to first value** | The tour ends by opening the first story, not on a "You're ready!" screen. The fastest path to the feeling "I understood an English text" is the strongest motivator. |
| **Autonomy** (self-determination theory) | The learner chooses their goal and level. Choices feel like *their* plan, which increases commitment. Always offer "Skip tour". |
| **Competence** | Show the learner they can already do it: the first sample sentence is fully understandable thanks to tap-to-translate. |
| **Commitment and implementation intentions** | People who decide *when and how much* they'll study follow through far more often than people who only intend to. The goal step asks for minutes and suggests a moment ("after breakfast", "on the way to work"). |
| **Small, achievable goal** | Default 10 minutes, 5 is fine. Small goals get started even on bad days, and starting every day is what builds the habit. |
| **Endowed progress** | People push harder towards a goal they've already started. After setting the goal, show the ring already slightly filled from the tour itself ("You've already done 1 minute"). |
| **Explain the why, briefly** | One line of "why this works" per feature (spaced repetition, reading first). Adults stick with methods they understand. |
| **Language of the learner** | Learners are Russian speakers from A1. Every step has a Russian line, so a complete beginner understands it. English headline + Russian body works well, because they also see their first English. |

## 3. The first-run tour (6 steps)

Each step: **headline** (English), **body** (English + Russian), **visual**, **why it matters**
(for the designer; optionally shown as a small "Why?" expandable).

### Step 1 · Welcome
- **Headline:** Learn English through short stories
- **Body (EN):** Ten minutes a day. Funny stories, real British English, and everything translated when you need it.
- **Body (RU):** Десять минут в день. Смешные истории, настоящий британский английский и перевод — когда он нужен.
- **Visual:** the home screen with the London skyline; the logo appears first.
- **Buttons:** "Let's start" (primary), "Skip tour" (text link).
- **Why it matters:** sets a low, concrete expectation (10 minutes) and a pleasant one (stories, not grammar drills). A small promise is easier to say yes to.

### Step 2 · Your level
- **Headline:** Where are you starting?
- **Body (EN):** Pick a level. You can change it any time.
- **Body (RU):** Выберите уровень. Его можно поменять в любой момент.
- **Choices (cards):**
  - **A1 · Beginner**: «Я только начинаю» (I'm just starting)
  - **A2 · Elementary**: «Знаю основы» (I know the basics)
  - **B1 · Intermediate**: «Могу читать простые тексты» (I can read simple texts)
- **Visual:** three level cards; the chosen one turns navy.
- **Why it matters:** autonomy and a fitting challenge. Texts that are too hard kill motivation fast; too easy feels pointless. "You can change it" removes the fear of choosing wrong.

### Step 3 · Tap any word
- **Headline:** Tap a word you don't know
- **Body (EN):** Red words are this story's new words. Tap any word for its Russian translation.
- **Body (RU):** Красным выделены новые слова истории. Нажмите на любое слово — появится перевод.
- **Visual (animated):** a two-line sample from A1-1: *"Tom and Priya are my **flatmates**."* A finger taps *flatmates* and the bottom sheet slides up: *flatmate → сосед по квартире*, with an "Add to cards" button. Green underline on an expression (*by the way*) with the label "phrase".
- **Interaction:** let the learner actually tap the word in this step.
- **Why it matters:** this is the "I can understand this" moment (competence). It also shows the learner never gets stuck: every text is designed so 9 of 10 words are already known, and the rest are one tap away.

### Step 4 · Words come back at the right time
- **Headline:** Your words come back before you forget them
- **Body (EN):** Add words to your cards. The app shows each one again just before you'd forget it. A few minutes a day is enough.
- **Body (RU):** Добавляйте слова в карточки. Приложение покажет каждое слово снова как раз перед тем, как вы бы его забыли. Хватит нескольких минут в день.
- **Visual (animated):** a card flips English → Russian; the four buttons Again / Hard / Good / Easy; under "Good" the label "in 10 days".
- **Why it matters:** spaced repetition is one of the best-proven methods for remembering vocabulary. Knowing *why* the app asks for "Hard / Good" makes learners rate honestly. Mention that a word usually needs many meetings, which is why words also return in later stories.

### Step 5 · Use it: tasks and your AI tutor
- **Headline:** Then use your English
- **Body (EN):** Translate short texts and chat with Emma, your AI tutor. She corrects you kindly and explains in Russian.
- **Body (RU):** Переводите короткие тексты и общайтесь с Эммой — вашим ИИ-репетитором. Она мягко исправляет ошибки и объясняет по-русски.
- **Visual:** the Tasks hub (Translate to English, Chat with AI) and a chat bubble from Emma with a short correction.
- **Why it matters:** reading builds understanding; *producing* language (writing, speaking) is what makes it usable. Feedback in the learner's own language lowers the fear of making mistakes, the biggest blocker for adult learners.

### Step 6 · Your daily goal (the commitment step)
- **Headline:** How much time a day?
- **Body (EN):** Choose a goal you can keep even on a busy day. Only active minutes count.
- **Body (RU):** Выберите цель, которую сможете выполнять даже в загруженный день. Считаются только активные минуты.
- **Choices:** 5 · **10** (preselected, "Recommended") · 15 · 20 minutes.
- **Optional second line:** "When will you study?" chips: After breakfast · On the way · Lunch break · Evening. Saved for later reminders; the main value is that choosing it creates the plan.
- **Visual:** the home goal ring, already slightly filled: "1 of 10 min, you've started!"
- **Below the ring:** "Reach your goal to grow your streak. Miss a day? A streak freeze has your back."
- **Button:** "Read my first story →" opens episode 1 of the chosen level directly.
- **Why it matters:**
  - Choosing the amount and the moment is an **implementation intention**, which strongly increases follow-through.
  - The pre-filled ring uses the **endowed progress** effect.
  - Mentioning streak freezes up front prevents the "I broke my streak, I quit" spiral, because one missed day isn't failure.
  - Ending on the first story gives immediate value.

## 4. Just-in-time tips (shown once, at the moment they're useful)

Short tooltips or coach marks instead of front-loading everything into the tour. One per screen visit, dismissible, never two at once.

| When | Where | Tip (EN / RU) | Why |
|---|---|---|---|
| First time a text is finished | Under the text | **Questions check you understood** / Вопросы проверят, всё ли понятно. | Retrieval practice: answering from memory strengthens learning more than rereading. |
| First grammar spotlight | Grammar box | **One grammar idea per story, explained in Russian** / Одна грамматическая тема на историю — с объяснением по-русски. | Short explicit explanations help adults; tying them to a sentence they just read makes them stick. |
| First green expression tapped | Popup | **Phrases are learned as a whole** / Выражения учат целиком. | Native speakers use ready-made chunks; learning them whole speeds up speaking. |
| First time the daily goal is reached | Home | **Goal reached! Streak +1** / Цель выполнена! Серия +1 | Immediate positive feedback at the moment of success. |
| Day 2, first open | Home | **Welcome back. 2 days in a row** / С возвращением! Уже 2 дня подряд. | The second day is the hardest for a new habit; acknowledging it matters. |
| First streak freeze used | Home | **A freeze saved your streak. Keep going today** / Заморозка сохранила вашу серию. Продолжайте сегодня. | Turns a "failure" into continuation (no all-or-nothing thinking). |
| 7-day streak | Home | **One week! You earned a streak freeze** / Неделя! Вы получили заморозку серии. | Milestones and a small useful reward, not just points. |
| First card review with 0 due | Cards | **All caught up. New words come from your stories** / Всё повторено. Новые слова — из ваших историй. | Connects reading and cards into one loop. |
| First AI tutor plan | Home | **Your plan is based on what you've done** / План составлен по вашим результатам. | Personalisation is more motivating when people know it's personal. |

## 5. Copy rules

- **Tone:** warm, short, grown-up. No childish exclamation chains, no guilt ("You missed your lesson!"). Encourage returning, never shame.
- **Talk about the learner's progress, not points.** "You know 40 new words", not "You earned 120 XP".
- **Russian lines:** natural, polite «вы», short. Never longer than the English line.
- **Numbers make goals concrete:** "10 minutes", "8 short stories per topic", "a word usually needs several meetings".

## 6. Laptop variant

- Same 6 steps in a centred card (max ~560px) over the dimmed home screen, with the live mini-screen on the left and text on the right.
- Step 3 on laptop: the tapped word appears in the reading side panel (as in the laptop reading design), not a bottom sheet.
- Keyboard: Enter = next, Esc = skip.

## 7. What to design

1. The 6 tour steps (phone), with the animated moments described above as key frames.
2. The laptop version of steps 1, 3 and 6.
3. The coach-mark / tooltip component for the just-in-time tips (one example per type: under a text, on a card, on the home ring).
4. Celebration states: goal reached, 7-day streak, freeze used.
