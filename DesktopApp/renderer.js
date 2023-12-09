function sidebar_open() {
  document.getElementById("content").style.marginLeft = "12em";
  document.getElementById("sidenav").style.width = "10em";
  document.getElementById("sidenav").style.display = "block";
  document.getElementById("opennav").style.display = "none";
}
function sidebar_close() {
  document.getElementById("content").style.marginLeft = "0em";
  document.getElementById("sidenav").style.display = "none";
  document.getElementById("opennav").style.display = "inline-block";
}
function open_page(evt, page_name, page_title) {
  var i, pagecontent, pagelinks;
  pagecontent = document.getElementsByClassName("pagecontent");
  for (i = 0; i < pagecontent.length; i++) {
    pagecontent[i].style.display = "none";
  }
  pagelinks = document.getElementsByClassName("pagelinks");
  for (i = 0; i < pagelinks.length; i++) {
    pagelinks[i].className = pagelinks[i].className.replace(" active", "");
  }
  document.getElementById(page_name).style.display = "block";
  evt.currentTarget.className += " active";
  document.getElementById("page-title").textContent = page_title;
}

mainWindow.sidebar_open = sidebar_open;
mainWindow.sidebar_close = sidebar_close;
mainWindow.open_page = open_page;
