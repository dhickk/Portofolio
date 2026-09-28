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
