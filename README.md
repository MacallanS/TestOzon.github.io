# Circle Progress Component

Интерактивный компонент для отображения прогресса в виде кольца, созданный с нуля на **HTML/CSS/JS** без библиотек. Подходит для мобильных веб-приложений и легко переиспользуется.


[Деплой](https://macallans.github.io/TestOzon.github.io/)

---

## Функциональность

- Отображение прогресса в виде SVG-кольца
- Ручной ввод значения от 0 до 100
- Переключатели:
  - **Animate** – запускает бесконечную анимацию вращения
  - **Hide** – скрывает компонент со страницы
- Реактивный дизайн: адаптируется под ширину экрана

---

## Дополнительный функционал

**Клик по SVG-кольцу**:
- Клик в любую точку круга устанавливает прогресс, соответствующий углу.
- Угол рассчитывается **по часовой стрелке от 12 часов**.
- Работает с мышью и касанием.

---

## API для внешнего управления

Доступен через `window.ProgressBlock`:

| Метод            | Описание                                      |
|------------------|-----------------------------------------------|
| `setValue(val)`  | Установить значение прогресса (0–100)         |
| `getValue()`     | Получить текущее значение                     |
| `startAnimation()` | Запустить вращение дуги                      |
| `stopAnimation()`  | Остановить анимацию                          |
| `hide()`         | Скрыть компонент                              |
| `show()`         | Показать компонент                            |

Пример:

```js
ProgressBlock.setValue(75);
ProgressBlock.startAnimation();
