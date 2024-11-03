
    function toggleSidebar() {
        const sidebar = document.getElementById("sidebar");
        const openSidebarBtn = document.getElementById("openSidebarBtn");
        const profileSection = document.getElementById("profileSection");

        if (sidebar.style.width === "200px" || sidebar.style.width === "") {
            sidebar.style.width = "0";
            openSidebarBtn.style.display = "block";
            profileSection.style.display = "none"; // buat ngumpetin foto sama text
        } else {
            sidebar.style.width = "200px";
            openSidebarBtn.style.display = "none";
            profileSection.style.display = "block"; // munculin foto sama text
        }
    }