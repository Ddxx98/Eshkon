export const saveLayoutConfig = (config) => {
  localStorage.setItem('layoutConfig', JSON.stringify(config));
};

export const loadLayoutConfig = () => {
  try {
    const data = localStorage.getItem('layoutConfig');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const saveSEOConfig = (seo) => {
  localStorage.setItem('seoConfig', JSON.stringify(seo));
};

export const loadSEOConfig = () => {
  try {
    const data = localStorage.getItem('seoConfig');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const saveThemeConfig = (theme) => {
  localStorage.setItem('themeConfig', JSON.stringify(theme));
};

export const loadThemeConfig = () => {
  try {
    const data = localStorage.getItem('themeConfig');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};
