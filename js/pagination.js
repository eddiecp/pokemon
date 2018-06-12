/**
 * Pagination JS
 *
 * Include pagination.js before calling pagination_initialise() to initialise pagination setting.
 *
 * Author: Eddie Chan
 * Date: 31-05-2018
 */
var number_per_page;
var current_page=1;

/**
 * Initialise pagination setting.
 *
 * @param page_size
 *      number of elements per page
 */
function pagination_initialise(page_size) {
    console.log("page size=" + page_size);
    number_per_page = page_size;
    console.log("page size=" + number_per_page);
}

/**
 * Get max number of pages.
 *
 * @returns {number}
 */
function getMaxPages() {
    // Div with hidden display style are those filtered panel
    // Divs with hideComponent class are not in current page.
    var numFilteredBlocks = 0;
    $("#contentDiv div").each(function (idx, itm) {
        if (itm.style != null && itm.style.display == 'none') {
            numFilteredBlocks++;
        }
    });
    var totalBlocks =  $('#contentDiv div').length;
    var max_pages = Math.ceil((totalBlocks-numFilteredBlocks)/number_per_page);   // ceil() to include remainder page
    return max_pages;
}

function showPage() {
    var count=0;

    if (current_page <= 0) current_page=1;
    var min_count = (current_page-1) * number_per_page;
    var max_count = current_page * number_per_page;

    $("#contentDiv div").each(function (idx, itm) {

            // Skip filtered blocks which have display style 'none'
            if (itm.style != null && itm.style.display == 'none') {
                return;
            }

            // Counter for non-filtered components
            if (count >= min_count && count < max_count) {
                // Make it visible
                if ($(itm).hasClass('hideComponent')) {
                    $(itm).removeClass('hideComponent');
                }
            } else {
                // Make it invisible
                if ($(itm).hasClass('hideComponent') == false) {
                    $(itm).addClass('hideComponent');
                }
            }
            count++;
        }
    );
}

function showCurrentPage() {

    var max_pages = getMaxPages();

    // make sure page number within range
    if (current_page >= max_pages) {
        current_page = max_pages;
    }
    if (current_page < 1) {
        current_page = 1;
    }

    showPage();
}

function showNextPage() {

    var max_pages = getMaxPages();

    if (current_page >= max_pages) {
        // Already on the last page
        current_page = max_pages;
        return;
    }

    current_page++;
    showPage();
}

function showPreviousPage() {

    if (current_page <= 1) {
        // Already on the first page
        current_page = 1;
        return;
    }
    current_page--;
    showPage();
}