class GameSpinner {
    constructor(canvasId, players, onSpinComplete) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.players = players;
        this.onSpinComplete = onSpinComplete;
        
        this.currentAngle = 0; 
        this.isSpinning = false;
        this.colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#808000', '#01F9C6'];
        
        this.drawWheel();
    }

    drawWheel() {
        const numSegments = this.players.length;
        const arcSize = (2 * Math.PI) / numSegments;
        const radius = this.canvas.width / 2;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();
        // Translate context to center point to draw rotated wheel components
        this.ctx.translate(radius, radius);
        this.ctx.rotate(this.currentAngle);

        for (let i = 0; i < numSegments; i++) {
            const angle = i * arcSize;
            
            // Draw segment slice
            this.ctx.beginPath();
            this.ctx.fillStyle = this.colors[i % this.colors.length];
            this.ctx.moveTo(0, 0);
            this.ctx.arc(0, 0, radius, angle, angle + arcSize);
            this.ctx.lineTo(0, 0);
            this.ctx.fill();
            this.ctx.stroke();

            // Render Player text inside slice
            this.ctx.save();
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = 'bold 16px sans-serif';
            this.ctx.textAlign = 'right';
            // Rotate to center of current segment slice
            this.ctx.rotate(angle + arcSize / 2);
            this.ctx.fillText(this.players[i], radius - 20, 5);
            this.ctx.restore();
        }

        // Draw small inner decorative hub
        this.ctx.beginPath();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.arc(0, 0, 15, 0, 2 * Math.PI);
        this.ctx.fill();

        this.ctx.restore();
    }

    spin() {
        if (this.isSpinning) return;
        this.isSpinning = true;

        const spinDuration = 4000; // 4 seconds total
        const startTimestamp = performance.now();
        
        // Randomly calculate full rotations + a target terminal slice
        const totalRotationAngle = (Math.PI * 2 * 5) + (Math.random() * Math.PI * 2);
        const startingAngle = this.currentAngle;

        const animate = (now) => {
            const elapsed = now - startTimestamp;
            const progress = Math.min(elapsed / spinDuration, 1);
            
            // Cubic ease-out mathematical formula for natural slowing down
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            
            this.currentAngle = startingAngle + (easeOutProgress * totalRotationAngle);
            this.drawWheel();

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.isSpinning = false;
                this.calculateWinner();
            }
        };

        requestAnimationFrame(animate);
    }

    calculateWinner() {
        const numSegments = this.players.length;
        const arcSize = (2 * Math.PI) / numSegments;
        
        // Normalize angle to a safe positive range [0, 2PI]
        let normalizedAngle = this.currentAngle % (Math.PI * 2);
        if (normalizedAngle < 0) normalizedAngle += Math.PI * 2;

        /* The needle indicator sits static at the top position (Angle: 270 deg / 1.5 * Math.PI).
           To calculate what segment touches the top, we reverse engineer the rotation offsets.
        */
        const absoluteNeedlePos = (1.5 * Math.PI) - normalizedAngle;
        let finalPointerRad = absoluteNeedlePos % (Math.PI * 2);
        if (finalPointerRad < 0) finalPointerRad += Math.PI * 2;

        const winningIndex = Math.floor(finalPointerRad / arcSize);
        const actualWinner = this.players[winningIndex];

        if (this.onSpinComplete) {
            this.onSpinComplete(actualWinner);
        }
    }
}