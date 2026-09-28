<script>
        const root = document.documentElement;

        function hexToRgba(hex, alphaPercent) {
            let r = parseInt(hex.substring(1, 3), 16);
            let g = parseInt(hex.substring(3, 5), 16);
            let b = parseInt(hex.substring(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alphaPercent / 100})`;
        }

        // Fungsi untuk menerapkan warna tema dan glow ke seluruh halaman
        function applyTheme(colorHex, alphaVal, glowValPx) {
            root.style.setProperty('--primary-text', colorHex);
            root.style.setProperty('--glow-color', colorHex);
            root.style.setProperty('--glow-intensity', glowValPx + 'px');
            root.style.setProperty('--bg-fade', hexToRgba(colorHex, alphaVal));

            // Simpan preferensi ke localStorage
            localStorage.setItem('portfolio_color', colorHex);
            localStorage.setItem('portfolio_opacity', alphaVal);
            localStorage.setItem('portfolio_glow', glowValPx);
        }

        // Muat tema yang tersimpan saat halaman dibuka
        function loadTheme() {
            const savedColor = localStorage.getItem('portfolio_color') || '#ff0000';
            const savedOpacity = localStorage.getItem('portfolio_opacity') || '15';
            const savedGlow = localStorage.getItem('portfolio_glow') || '15';

            applyTheme(savedColor, savedOpacity, savedGlow);
            return { savedColor, savedOpacity, savedGlow };
        }

        // Jalankan logika setelah elemen halaman siap
        document.addEventListener('DOMContentLoaded', () => {
            const { savedColor, savedOpacity, savedGlow } = loadTheme();

            const paletteBtn = document.getElementById('paletteBtn');
            const colorMenu = document.getElementById('colorMenu');
            const customColorPicker = document.getElementById('customColorPicker');
            const colorPresets = document.querySelectorAll('.color-preset');
            const opacityRange = document.getElementById('opacityRange');
            const opacityVal = document.getElementById('opacityVal');
            const glowRange = document.getElementById('glowRange');
            const glowVal = document.getElementById('glowVal');

            if (customColorPicker) customColorPicker.value = savedColor;
            if (opacityRange) {
                opacityRange.value = savedOpacity;
                opacityVal.textContent = savedOpacity;
            }
            if (glowRange) {
                glowRange.value = savedGlow;
                glowVal.textContent = savedGlow;
            }

            colorPresets.forEach(p => {
                if (p.getAttribute('data-color') === savedColor) {
                    p.classList.add('scale-110', 'border-white');
                }
            });

            // Toggle menu palette saat tombol diklik
            if (paletteBtn && colorMenu) {
                paletteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    colorMenu.classList.toggle('opacity-0');
                    colorMenu.classList.toggle('pointer-events-none');
                    colorMenu.classList.toggle('translate-y-2');
                });

                // Tutup menu saat klik di luar area palette
                document.addEventListener('click', (e) => {
                    if (!colorMenu.contains(e.target) && !paletteBtn.contains(e.target)) {
                        colorMenu.classList.add('opacity-0', 'pointer-events-none', 'translate-y-2');
                    }
                });
            }

            // Event listener untuk pilihan warna preset
            colorPresets.forEach(preset => {
                preset.addEventListener('click', () => {
                    const selectedColor = preset.getAttribute('data-color');
                    if (customColorPicker) customColorPicker.value = selectedColor;
                    applyTheme(selectedColor, opacityRange ? opacityRange.value : 15, glowRange ? glowRange.value : 15);
                });
            });

            // Event listener untuk custom color picker
            if (customColorPicker) {
                customColorPicker.addEventListener('input', (e) => {
                    applyTheme(e.target.value, opacityRange ? opacityRange.value : 15, glowRange ? glowRange.value : 15);
                });
            }

            // Event listener untuk slider background fade
            if (opacityRange && opacityVal) {
                opacityRange.addEventListener('input', (e) => {
                    opacityVal.textContent = e.target.value;
                    applyTheme(customColorPicker ? customColorPicker.value : '#ff0000', e.target.value, glowRange ? glowRange.value : 15);
                });
            }

            // Event listener untuk slider glow intensity
            if (glowRange && glowVal) {
                glowRange.addEventListener('input', (e) => {
                    glowVal.textContent = e.target.value;
                    applyTheme(customColorPicker ? customColorPicker.value : '#ff0000', opacityRange ? opacityRange.value : 15, e.target.value);
                });
            }
        });

        // ==========================================
        // FUNGSI PEMUTAR VIDEO (PINDAH HALAMAN)
        // ==========================================
        function openVideoPlayer(fileName, titleText, fileSizeText) {
            const encodedFile = encodeURIComponent(fileName);
            const encodedTitle = encodeURIComponent(titleText);
            const encodedSize = encodeURIComponent(fileSizeText);
            
            window.location.href = `player.html?file=${encodedFile}&title=${encodedTitle}&size=${encodedSize}`;
        }
    </script>
        // ==========================================
        // EFEK JEJAK KURSOR (CURSOR TRAIL BOXES)
        // ==========================================
        const colors = ['#ff0000', '#ffff00', '#00ff00', '#0099ff', '#ffffff', '#ff00ff']; // Merah, Kuning, Hijau, Biru, Putih, Ungu
        const trailCount = 12; // Jumlah kotak jejak
        const trails = [];
        
        // Buat elemen kotak jejak secara dinamis
        for (let i = 0; i < trailCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'fixed pointer-events-none z-50 rounded-sm transition-opacity duration-300';
            dot.style.width = '10px';
            dot.style.height = '10px';
            dot.style.opacity = '0';
            document.body.appendChild(dot);
            trails.push({ element: dot, x: 0, y: 0 });
        }
        
        let mouseX = 0;
        let mouseY = 0;
        
        // Tangkap posisi kursor saat digerakkan
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Animasi pergerakan jejak kotak
        let currentX = 0;
        let currentY = 0;
        
        function animateCursorTrail() {
            let x = mouseX;
            let y = mouseY;
        
            trails.forEach((trail, index) => {
                const nextTrail = trails[index + 1] || trails[0];
                
                trail.x = x;
                trail.y = y;
        
                trail.element.style.transform = `translate(${trail.x}px, ${trail.y}px)`;
                trail.element.style.backgroundColor = colors[index % colors.length];
                trail.element.style.boxShadow = `0 0 6px ${colors[index % colors.length]}`;
                trail.element.style.opacity = (1 - index / trailCount) * 0.7; // Efek pudar di ujung
        
                x += (nextTrail.x - x) * 0.3;
                y += (nextTrail.y - y) * 0.3;
            });
        
            requestAnimationFrame(animateCursorTrail);
        }
        
        // Jalankan animasi saat halaman dimuat
        animateCursorTrail();
