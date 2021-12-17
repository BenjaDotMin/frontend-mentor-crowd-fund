import {createStore} from 'vuex';

export default createStore({

  state:{    
    pledgeModal: false,
    pledgeMade: false,
    mobileMenu: false,
    bookmarked: false,
    pledgeSelected: 0,
    pledgeActive: 0,
    pledgesRemaining: [101, 64, 0],
    scrollAmount:0,
    totalBackers: 5007,
    backedFunds: 89914,
  },

  actions:{
    closeModal({commit}){
      return commit("closeModal");
    },
    pledgeSelected({commit}, payload){       
      return commit("pledgeSelected", payload);
    },
    pledgeActive({commit}, payload){       
      return commit("pledgeActive", payload);
    },
    pledgeMade({commit}, payload){
      return commit("pledgeMade", payload);
    },
    pledgeReset({commit}){     
      return commit("pledgeReset");
    },
    mobileMenu({commit}){     
      return commit("mobileMenu");
    },
    bookmark({commit}){     
      return commit("bookmark");
    }       
  },

  mutations:{
    closeModal(state) {
      state.pledgeModal = !state.pledgeModal;
      state.pledgeMade = false;   
    },
    pledgeSelected(state, payload) {       
      state.pledgeModal = true;
      state.pledgeSelected = payload.stand; 
      state.scrollAmount = payload.scrollAmount       
    },
    pledgeActive(state, payload) {      
      state.pledgeSelected = payload      
    },
    pledgeMade(state, payload) {   
      state.totalBackers++;
      state.pledgeMade = true; 
      if(payload.pledgeID == 0) return;
      state.backedFunds += payload.pledgeValue;
      state.pledgesRemaining[payload.pledgeID-1]--;      
    },
    pledgeReset(state) {   
      state.pledgeMade = false;
      state.pledgeModal = false;  
    },
    mobileMenu(state) {   
      state.mobileMenu = !state.mobileMenu;     
    },
    bookmark(state) {   
      state.bookmarked = !state.bookmarked;     
    }
  }
});