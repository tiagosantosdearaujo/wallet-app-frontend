const validateUser = async (email) => {
  try {
    const result = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/users?email=${email}`
    );
    const user = await result.json();
    return user;
  } catch (error) {
    return { error };
  }
};

const onClickLogin = async () => {
  const email = document.getElementById("input-email").value;
  if (email.length < 5 || !email.includes("@")) {
    alert("Email Invalido");
    return;
  }

  const result = await validateUser(email);
  console.log(result);
  if (result.error) {
    alert("Falha ao validar o e-mail");
    return;
  }
  const nowDate = new Date().toISOString().split("T")[0];
  localStorage.setItem("@WalletApp:userEmail", result.email);
  localStorage.setItem("@WalletApp:userName", result.name);
  localStorage.setItem("@WalletApp:userId", result.id);
  //Sempre que o user logar aparece salva a data atual no localStorage.
  //Util para alimentar a data atual na pagina home.
  localStorage.setItem("@WalletApp:userDate", nowDate);
  window.open("./src/pages/home/index.html", "_self");
};
