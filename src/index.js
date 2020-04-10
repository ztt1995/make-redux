// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './reducerserviceWorker';

function createStore (reducer){
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = ()=>state
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener())                                   
  }
  dispatch({}) //初始化state
  return ({getState, dispatch,subscribe})
}

function reducer (state,action) {
  if(!state){
    return {
      title: {
        text: 'React 小书',
        color: 'red'
      },
      content: {
        text: 'React 小书',
        color: 'blue'
      }
    }
  }
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_TITLE_COLOR':
      return {
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
    default:
      return state
  }
}

const store = createStore(reducer)
let oldState = store.getState()
store.subscribe(()=>{
  const newState = store.getState()
  renderApp(newState, oldState)
  oldState = newState
})

function renderApp (newAppState,oldState={}){
  if(newAppState === oldState) return
  console.log('renderApp');
  renderTitle(newAppState.title,oldState.title)
  renderContent(newAppState.content,oldState.content)
}

function renderTitle(newTitle, oldTitle={}){
  if(newTitle === oldTitle) return
  console.log('renderTitle');
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

function renderContent(newContent, oldContent = {}){
  if(newContent === oldContent) return
  console.log('renderContent');
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}
renderApp(store.getState())
store.dispatch({type: 'UPDATE_TITLE_TEXT',text: '《React 小书》'})
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'red' }) // 修改标题颜色
// store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
// store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) 

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
