// document.onmouseover = function(event) {
//     // важно: быстро движущийся курсор может прыгнуть сразу к дочернему элементу, пропустив родительский
//     // так что событие mouseover произойдёт сразу на дочернем элементе.

//     let anchorElem = event.target.closest('[data-tooltip-text]');

//     if (!anchorElem) return;

//     // показываем подсказку и запоминаем её
//     tooltip = showTooltip(anchorElem, anchorElem.dataset);
//   };

//   document.onmouseout = function() {
//     // возможно такое, что произошло событие mouseout, но мы всё ещё внутри элемента
//     // (оно было где-то внутри и всплыло)
//     // но в этом случае сразу же последует событие mouseover,
//     // то есть подсказка исчезнет и потом снова покажется
//     //
//     // к счастью, этого не будет видно,
//     // так как оба события происходят почти одновременно
//     if (tooltip) {
//       tooltip.remove();
//       tooltip = false;
//     }
//   };

let tooltip = false;

$('.slider-solution__bullet, .slider-solution__bullet-modal').mouseover(
  function() {
    const anchorElem = this;

    const data = {
      text: $(this).data('tooltip-text'),
      pretext: $(this).data('tooltip-pretext')
    };

    tooltip = showTooltip(anchorElem, data);
  }
);

$('.slider-solution__bullet').mouseout(function() {
  if (tooltip) {
    tooltip.remove();
    tooltip = false;
  }
});

function showTooltip(anchorElem, html) {
  let tooltipElem = $(`
    <div class="slider-solution__bullet-modal">
        <p class="slider-solution__bullet-modal-description">${html.text}</p>
        <p class="slider-solution__bullet-modal-tip">${html.pretext}</p>
    </div>
  `);
  $('body').append(tooltipElem);

  let coords = anchorElem.getBoundingClientRect();

  // позиционируем подсказку над центром элемента
  let left =
    coords.left + (anchorElem.offsetWidth - tooltipElem[0].offsetWidth) / 2;
  if (left < 0) left = 0;

  let top = coords.top - 5 + 100;
  if (top < 0) {
    top = coords.top + anchorElem.offsetHeight + 5;
  }

  tooltipElem.css('left', left + 'px');
  tooltipElem.css('top', top + 'px');
  //   $(anchorElem)
  //     .closest('.slider-solution__container-bullet')
  //     .css('position', 'fixed');
  //   $(anchorElem)
  //     .closest('.slider-solution__container-bullet')
  //     .css('left', coords.left);
  //   $(anchorElem)
  //     .closest('.slider-solution__container-bullet')
  //     .css('top', coords.top);

  return tooltipElem;
}
