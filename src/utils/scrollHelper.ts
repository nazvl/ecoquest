/**
 * Выполняет плавную прокрутку к указанному элементу, располагая его ближе к центру экрана.
 * @param sectionId - ID элемента, к которому нужно прокрутить страницу
 * @param offset - дополнительное смещение в пикселях 
 */
export function scrollToSection(sectionId: string, offset: number = -180) {
  const section = document.getElementById(sectionId);
  if (section) {
    // Получаем текущую позицию элемента
    const elementPosition = section.getBoundingClientRect().top;
    // Получаем текущую позицию прокрутки
    const offsetPosition = elementPosition + window.pageYOffset + offset;
    
    // Плавная прокрутка к позиции с учетом смещения
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
}
