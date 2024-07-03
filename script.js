const emptyBadgeImg = 'empty.svg';

const badgesDisplayedPrimary = [
    { id: 13, status: 'empty', name: '', img: emptyBadgeImg, button: '', isEmpty: true, isPrimary: true }
];

const badgesDisplayed = [
    { id: 1, status: 'empty', name: '', img: emptyBadgeImg, button: '', isEmpty: true },
    { id: 2, status: 'empty', name: '', img: emptyBadgeImg, button: '', isEmpty: true },
    { id: 3, status: 'empty', name: '', img: emptyBadgeImg, button: '', isEmpty: true },
    { id: 4, status: 'empty', name: '', img: emptyBadgeImg, button: '', isEmpty: true }
];

const badgesEarned = [
    { id: 5, status: 'earned', name: 'canadian forces', img: 'canadianforces.png', button: 'use', isEmpty: false, isPrimary: false },
    { id: 6, status: 'earned', name: 'coast guard', img: 'coastguard.png', button: 'use', isEmpty: false, isPrimary: false },
    { id: 7, status: 'earned', name: 'complete profile', img: 'completeprofile.png', button: 'use', isEmpty: false, isPrimary: false },
    { id: 8, status: 'earned', name: 'Donor 10', img: 'donor_10.png', button: 'use', isEmpty: false, isPrimary: false },
    { id: 9, status: 'earned', name: 'Donor 20', img: 'donor_20.png', button: 'use', isEmpty: false, isPrimary: false },
    { id: 10, status: 'earned', name: 'Donor 25', img: 'donor_25.png', button: 'use', isEmpty: false, isPrimary: false },
    { id: 11, status: 'earned', name: 'Donor 30', img: 'donor_30.png', button: 'use', isEmpty: false, isPrimary: false },
    { id: 12, status: 'earned', name: 'Gold', img: 'gold.png', button: 'use', isEmpty: false, isPrimary: true },
    { id: 14, status: 'earned', name: 'Silver', img: 'silver.png', button: 'use', isEmpty: false, isPrimary: true },
    { id: 15, status: 'earned', name: 'Lifetime Gold', img: 'lifetime_gold.png', button: 'use', isEmpty: false, isPrimary: true },
];

function useBadge(badgeId, isPrimary) {
    const badgeIndex = badgesEarned.findIndex(badge => badge.id === badgeId);
    if (badgeIndex === -1) return;

    const badge = badgesEarned[badgeIndex];
    const displayedArray = isPrimary ? badgesDisplayedPrimary : badgesDisplayed;
    const emptySlotIndex = displayedArray.findIndex(slot => slot.isEmpty);

    if (emptySlotIndex !== -1) {
        displayedArray[emptySlotIndex] = { ...badge, isEmpty: false };
        badgesEarned[badgeIndex].status = 'used';
        badgesEarned[badgeIndex].button = 'remove';
    } else {
        console.log('There is no space available in your active badges.');
        alert('There is no space available in your active badges.');
    }
}

function removeBadge(badgeId, isPrimary) {
    const displayedArray = isPrimary ? badgesDisplayedPrimary : badgesDisplayed;
    const displayIndex = displayedArray.findIndex(badge => badge.id === badgeId);
    if (displayIndex === -1) return;

    const badge = displayedArray[displayIndex];
    const earnedIndex = badgesEarned.findIndex(badge => badge.id === badgeId);

    if (earnedIndex !== -1) {
        displayedArray[displayIndex] = { id: badge.id, status: 'empty', name: '', img: emptyBadgeImg, button: '', isEmpty: true, isPrimary: isPrimary };
        badgesEarned[earnedIndex].status = 'earned';
        badgesEarned[earnedIndex].button = 'use';
    }
}
function renderBadges(containerId, badges) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    badges.forEach(badge => {
        const imgElement = document.createElement('img');
        imgElement.src = badge.img;
        container.appendChild(imgElement);
    });
}

function renderBadgesDisplayed() {
    renderBadges('badgesDisplayedPrimary', badgesDisplayedPrimary);
    renderBadges('badgesDisplayed', badgesDisplayed);
}

function renderBadgesEarned() {
    const container = document.getElementById('badgesEarned');
    container.innerHTML = '';
    badgesEarned.forEach(badge => {
        const card = document.createElement('div');
        card.classList.add('card');

        const imgElement = document.createElement('img');
        imgElement.src = badge.img;
        card.appendChild(imgElement);

        const nameElement = document.createElement('p');
        nameElement.textContent = badge.name;
        card.appendChild(nameElement);

        const statusElement = document.createElement('p');
        statusElement.textContent = badge.status;
        card.appendChild(statusElement);

        const buttonElement = document.createElement('button');
        buttonElement.textContent = badge.button;
        buttonElement.onclick = () => {
            if (badge.button === 'use') {
                useBadge(badge.id, badge.isPrimary);
            } else {
                removeBadge(badge.id, badge.isPrimary);
            }
            renderBadgesDisplayed();
            renderBadgesEarned();
        };
        card.appendChild(buttonElement);

        container.appendChild(card);
    });
}

renderBadgesDisplayed();
renderBadgesEarned();

