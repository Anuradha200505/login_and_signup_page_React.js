// src/services/api.js

const BASE_URL = "https://fuelapi11.azurewebsites.net/api";


// 🔐 LOGIN
export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/Account/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        "accept": "*/*"
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    return { success: res.ok, data };

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    return { success: false };
  }
};


// 📄 GET ALL SITES
export const getSiteDetails = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/SiteDetail`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    return { success: res.ok, data };

  } catch (error) {
    console.log("GET SITE ERROR:", error);
    return { success: false };
  }
};


// ➕ CREATE SITE
export const addSiteDetails = async (token, siteData) => {
  try {
    const res = await fetch(`${BASE_URL}/SiteDetail`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "accept": "*/*"
      },
      body: JSON.stringify(siteData)
    });

    let data = null;
    try {
      data = await res.json();
    } catch {}

    return {
      success: res.ok,
      status: res.status,
      data
    };

  } catch (error) {
    console.log("ADD SITE ERROR:", error);
    return { success: false };
  }
};


// ✏️ UPDATE SITE
export const updateSiteDetails = async (token, siteKey, siteData) => {
  try {
    const res = await fetch(`${BASE_URL}/SiteDetail/${siteKey}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "accept": "*/*"
      },
      body: JSON.stringify(siteData)
    });

    return {
      success: res.ok,
      status: res.status
    };

  } catch (error) {
    console.log("UPDATE ERROR:", error);
    return { success: false };
  }
};


// ❌ DELETE SITE
export const deleteSite = async (token, siteKey) => {
  try {
    const res = await fetch(`${BASE_URL}/SiteDetail/${siteKey}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    return {
      success: res.ok,
      status: res.status
    };

  } catch (error) {
    console.log("DELETE ERROR:", error);
    return { success: false };
  }
};