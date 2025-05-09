// Simulation temporaire du backend
export const authService = {
    login: async (email, password, userType) => {
      // En production, remplacer par un vrai appel API
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            user: {
              email,
              type: userType,
              token: 'fake-jwt-token'
            }
          });
        }, 500);
      });
    },
  
    logout: () => {
      localStorage.removeItem('currentUser');
    },
  
    getCurrentUser: () => {
      return JSON.parse(localStorage.getItem('currentUser'));
    }
  };