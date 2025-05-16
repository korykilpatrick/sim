# VERSION 1
#!/bin/bash

# WARNING: This script will permanently delete files.
# Review the list carefully and ensure you have a backup or your code is committed.

# Navigate to the sim/src directory relative to where the script is run,
# or adjust the paths if your script is elsewhere.
# Assuming the script is run from the root of the 'sim' project.
PROJECT_ROOT="$(pwd)" # Or set this to your project's root path explicitly
SRC_DIR="$PROJECT_ROOT/src"

echo "IMPORTANT: This script will delete files from the following directory:"
echo "$SRC_DIR"
echo "Please review the files to be deleted below."
echo "Press Ctrl+C to cancel, or Enter to proceed."
read

# List of files and directories to delete
# Each path is relative to the src/ directory

files_to_delete=(
  # Root src/ files
  "routes.tsx"
  "index.css"

  # Old src/app/ specific error files
  "app/errors.ts"
  "app/apiError.ts"

  # Old src/components/layout/ files (flat structure)
  "components/layout/CartIcon.tsx"
  "components/layout/Footer.tsx"
  "components/layout/FooterBranding.tsx"
  "components/layout/FooterContact.tsx"
  "components/layout/FooterCopyright.tsx"
  "components/layout/FooterLinks.tsx"
  "components/layout/Header.tsx"
  "components/layout/Logo.tsx"
  "components/layout/MainLayout.tsx"
  "components/layout/Navigation.tsx"
  "components/layout/UserMenu.tsx"

  # Old src/components/ui/ files (flat structure)
  "components/ui/Alert.tsx"
  "components/ui/AlertActions.tsx"
  "components/ui/AlertContent.tsx"
  "components/ui/AlertIcon.tsx"
  "components/ui/Badge.tsx"
  "components/ui/Button.tsx"
  "components/ui/Card.tsx"
  "components/ui/Spinner.tsx"

  # Old flat component files within src/features/[featureName]/components/
  "features/auth/components/LoginForm.tsx"
  "features/auth/components/LogoutButton.tsx"
  "features/auth/components/RegisterForm.tsx"
  "features/cart/components/CartItem.tsx"
  "features/cart/components/CartItemDetails.tsx"
  "features/cart/components/CartItemImage.tsx"
  "features/cart/components/EmptyCartState.tsx"
  "features/cart/components/OrderSummary.tsx"
  "features/cart/components/QuantityControl.tsx"
  "features/cart/components/RemoveButton.tsx"
  "features/checkout/components/OrderSummary.tsx"
  "features/checkout/components/PaymentDetailsForm.tsx"
  "features/checkout/components/PaymentMethodSelector.tsx"
  "features/checkout/components/ShippingAddressForm.tsx"
  "features/confirmation/components/ConfirmationActions.tsx"
  "features/confirmation/components/OrderConfirmationHeader.tsx"
  "features/confirmation/components/OrderSummaryList.tsx"
  "features/dashboard/components/AlertItem.tsx"
  "features/dashboard/components/AlertsCard.tsx"
  "features/dashboard/components/AlertsHeader.tsx"
  "features/dashboard/components/DashboardHeader.tsx"
  "features/dashboard/components/DashboardSidebar.tsx"
  "features/dashboard/components/EmptyAlertsState.tsx"
  "features/dashboard/components/ProductCard.tsx"
  "features/dashboard/components/ProductFilters.tsx"
  "features/dashboard/components/ProductGrid.tsx"
  "features/product-config/components/AlertTypeSection.tsx"
  "features/product-config/components/AreaAlertConfigSection.tsx"
  "features/product-config/components/AreaMonitoringConfig.tsx"
  "features/product-config/components/AreaNameSection.tsx"
  "features/product-config/components/ConfigFormBase.tsx"
  "features/product-config/components/InfoBoxSection.tsx"
  "features/product-config/components/InvestigationRFIForm.tsx"
  "features/product-config/components/MapSelectionSection.tsx"
  "features/product-config/components/MaritimeAlertConditionalFields.tsx"
  "features/product-config/components/MaritimeAlertConfig.tsx"
  "features/product-config/components/MonitoringCriteriaSection.tsx"
  "features/product-config/components/MonitoringDurationSection.tsx"
  "features/product-config/components/NotesSection.tsx"
  "features/product-config/components/PrioritySection.tsx"
  "features/product-config/components/ReportConfig.tsx"
  "features/product-config/components/ReportDepthSection.tsx"
  "features/product-config/components/rfi/InvestigationTimeframeForm.tsx"
  "features/product-config/components/rfi/InvestigationTypeSelector.tsx"
  "features/product-config/components/rfi/RFISubmissionFooter.tsx"
  "features/product-config/components/rfi/SubjectInformationForm.tsx"
  "features/product-config/components/ShipAlertConfigSection.tsx"
  "features/product-config/components/SpecificVesselsSection.tsx"
  "features/product-config/components/TimeframeSection.tsx"
  "features/product-config/components/TrackingCriteriaSection.tsx"
  "features/product-config/components/UpdateFrequencySection.tsx"
  "features/product-config/components/VesselIdentificationSection.tsx"
  "features/product-config/components/VesselTrackingConfig.tsx"
  "features/products/components/ClearFiltersButton.tsx"
  "features/products/components/FilterSidebar.tsx"
  "features/products/components/PlaceholderImage.tsx"
  "features/products/components/ProductCard.tsx"
  "features/products/components/ProductCardActions.tsx"
  "features/products/components/ProductCardImage.tsx"
  "features/products/components/ProductCardInfo.tsx"
  "features/products/components/ProductCardPricing.tsx"
  "features/products/components/ProductCardTags.tsx"
  "features/products/components/ProductHeader.tsx"
  "features/products/components/ProductImage.tsx"
  "features/products/components/ProductImageGallery.tsx"
  "features/products/components/ProductInformation.tsx"
  "features/products/components/ProductPricing.tsx"
  "features/products/components/ProductSpecialFeatures.tsx"
  "features/products/components/PromotionalSlider.tsx"
  "features/products/components/SearchBox.tsx"
  "features/products/components/TypeFilter.tsx"
  "features/reports/components/CustomReportRequestCard.tsx"
  "features/reports/components/ReportItem.tsx"
  "features/reports/components/ReportsList.tsx"
  "features/user-settings/components/ChangePasswordCard.tsx"
  "features/user-settings/components/NotificationPreferencesCard.tsx"
  "features/user-settings/components/UserProfileSettingsCard.tsx"

  # Old duplicated src/features/marketplace/ components
  "features/marketplace/components/EmptySearchState.tsx"
  "features/marketplace/components/index.ts"
  "features/marketplace/components/MarketplaceErrorState.tsx"
  "features/marketplace/components/MarketplaceHeader.tsx"
  "features/marketplace/components/MarketplaceLoadingState.tsx"
  "features/marketplace/components/SearchResults.tsx"
  # If the entire marketplace feature was moved, uncomment below
  # "features/marketplace/index.ts" # Only if the whole folder content moved

  # Old src/hooks/ files
  "hooks/redux.ts"

  # Old src/lib/ files
  "lib/typeGuards.ts"
  "lib/zodSchemas.ts"

  # Old src/pages/ files (flat structure)
  "pages/CartPage.tsx"
  "pages/CheckoutPage.tsx"
  "pages/DashboardPage.tsx"
  "pages/LoginPage.tsx"
  "pages/MarketplacePage.tsx"
  "pages/NotFoundPage.tsx"
  "pages/PaymentConfirmationPage.tsx"
  "pages/ProductConfigPage.tsx"
  "pages/ProductDetailsPage.tsx"
  "pages/RegisterPage.tsx"
  "pages/ReportsPage.tsx"
  "pages/UserSettingsPage.tsx"

  # Potentially old API slice
  "features/product-config/rfiApi.ts"
)

# Directories to delete (use with -rf, be very careful)
dirs_to_delete=(
  "features/ui"          # Entire old UI feature directory
  "schemas"              # Entire old schemas directory
  "services"             # Entire old services directory
  "store/slices"         # Old Redux slices directory
  "store"                # Old store directory (if only index.ts and slices/ were in it)
                         # Note: If store/index.ts was the only file, add "store/index.ts" to files_to_delete instead
                         # and remove "store" from dirs_to_delete if other valid files exist in "store/"
  "typeGuards"           # Entire old top-level typeGuards directory
  "types"                # Entire old top-level types directory
  "utils"                # Entire old top-level utils directory
)

# Delete individual files
for file_path in "${files_to_delete[@]}"; do
  full_path="$SRC_DIR/$file_path"
  if [ -f "$full_path" ]; then
    echo "Deleting file: $full_path"
    rm "$full_path"
  else
    echo "File not found (already deleted or incorrect path?): $full_path"
  fi
done

# Delete entire directories
for dir_path in "${dirs_to_delete[@]}"; do
  full_path="$SRC_DIR/$dir_path"
  if [ -d "$full_path" ]; then
    echo "Deleting directory: $full_path"
    rm -rf "$full_path"
  else
    echo "Directory not found (already deleted or incorrect path?): $full_path"
  fi
done

# Special handling for src/store/index.ts if src/store/slices is deleted
# and src/store directory itself might still exist if it had other things.
# If src/app/store.ts is the new truth, then src/store/index.ts is likely old.
store_index_file="$SRC_DIR/store/index.ts"
if [ -f "$store_index_file" ] && ! [ -d "$SRC_DIR/store/slices" ]; then # Check if slices dir is gone
    echo "Deleting old store configuration: $store_index_file"
    rm "$store_index_file"
    # Attempt to remove store directory if it's now empty
    if [ -d "$SRC_DIR/store" ] && [ -z "$(ls -A $SRC_DIR/store)" ]; then
        echo "Deleting empty directory: $SRC_DIR/store"
        rmdir "$SRC_DIR/store"
    fi
fi


echo ""
echo "Cleanup script finished."
echo "Please check your git status to see the changes and test your application thoroughly."