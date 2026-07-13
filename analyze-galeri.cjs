const fs = require('fs');
const path = require('path');

const galeriDir = path.join(__dirname, 'public', 'galeri');

function getFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(filePath));
        } else {
            // Only keep images
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
                results.push(filePath);
            }
        }
    });
    return results;
}

const allImages = getFiles(galeriDir);
console.log(`Total images found: ${allImages.length}`);

// Grouping logic
const categories = {
    '16-feb-l2-l3': {
        title: 'Pekerjaan L2-L3 (16 Feb)',
        subtitle: 'ROAD MAINTENANCE',
        images: []
    },
    'minggu-15-feb': {
        title: 'Pekerjaan Minggu (15 Feb)',
        subtitle: 'WEEKEND MAINTENANCE',
        images: []
    },
    'flagman': {
        title: 'Flagman & Traffic Control',
        subtitle: 'TRAFFIC SAFETY',
        images: []
    },
    'truk': {
        title: 'Armada & Logistik',
        subtitle: 'LOGISTICS & FLEET',
        images: []
    },
    'operasional': {
        title: 'Operasional & Peralatan',
        subtitle: 'OPERATIONAL READINESS',
        images: []
    }
};

allImages.forEach((img) => {
    const relativePath = path.relative(path.join(__dirname, 'public'), img).replace(/\\/g, '/');
    const fileName = path.basename(img).toLowerCase();
    
    if (img.includes('16 feb L2-L3')) {
        categories['16-feb-l2-l3'].images.push('/' + relativePath);
    } else if (img.includes('minggu 15 feb')) {
        categories['minggu-15-feb'].images.push('/' + relativePath);
    } else if (fileName.startsWith('flagman')) {
        categories['flagman'].images.push('/' + relativePath);
    } else if (fileName.startsWith('truk')) {
        categories['truk'].images.push('/' + relativePath);
    } else {
        categories['operasional'].images.push('/' + relativePath);
    }
});

Object.keys(categories).forEach((key) => {
    console.log(`Category: ${categories[key].title} (${categories[key].subtitle}) - ${categories[key].images.length} images`);
});

// Write to a JSON file for reference
const subsetCategories = {};
Object.keys(categories).forEach((key) => {
    subsetCategories[key] = {
        title: categories[key].title,
        subtitle: categories[key].subtitle,
        images: selectSubset(categories[key].images, 15)
    };
});

function selectSubset(arr, maxItems) {
    if (arr.length <= maxItems) return arr;
    const step = arr.length / maxItems;
    const subset = [];
    for (let i = 0; i < maxItems; i++) {
        const index = Math.floor(i * step);
        subset.push(arr[index]);
    }
    return subset;
}

fs.writeFileSync('galeri-grouped.json', JSON.stringify(subsetCategories, null, 2));
console.log('Grouped data written to galeri-grouped.json');
