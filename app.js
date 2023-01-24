cols = document.querySelectorAll('.col');

document.addEventListener('click', event => {
  const type = event.target.dataset.type
  if (type === 'pin'){
    event.target.style.color = '#fff'
    event.target.dataset.type = 'pinned'
  }
  if (type === 'pinned'){
    event.target.style.color = 'rgba(255, 255, 255, 0.3)'
    event.target.dataset.type = 'pin'
  }
  if (type === undefined){
    const colors = setRandomColor(cols);
    updateColorsHash(colors);
  }
  if (type == 'copy'){
    copyToClipboard(event.target.textContent)
  }
})

const generateColor = () => {
  const hex = '0123456789ABCDEF';
  color = ''
  for(let i = 0; i < 6; i++){
    color += hex[Math.floor(Math.random() * hex.length)]
  }
  return '#' + color;
}

const setRandomColor = (cols, isInitial) => {
  const colors = isInitial ? getColorsFromHash() : [];
  isInitial = isInitial && colors.length > 0
  cols.forEach((col, index) => {
    const isPinned = col.querySelector('i').dataset.type === 'pinned';
    const text = col.querySelector('h2');
    if(isPinned){
      colors.push(text.textContent)
      return
    }

    const color = isInitial ? colors[index] : generateColor();
    
    col.style.backgroundColor = color;
    if(!isInitial){
      colors.push(color);
    }
    text.textContent = color;
    setTextColor({text, color});
  });
  return colors
}
//Переделать в функцию, которая проверяет яркий оттенок или темный
const borW = (color) => {
  console.log(color)
  return '#fff'
} 

const copyToClipboard = (text) => {
  return navigator.clipboard.writeText(text)
}

const setTextColor = ({text, color}) => {
text.style.color = borW(color);
}

const updateColorsHash = (colors = ['#333','#333','#444']) => {
  document.location.hash = colors.map(color =>{
    return color.toString().substring(1)
  }).join('-')
}

const getColorsFromHash = () =>{
  if(document.location.hash.length > 1){
    return document.location.hash.substring(1).split('-').map(el => {return '#' + el})
  }
  return []
}

setRandomColor(cols, true);