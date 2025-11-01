# Indigenous Health Medical Supply App – Frontend Specifications

This document defines the technical and functional specifications for the **Sign-In Page** and **Medical Supply Request Form** components of the Indigenous Health Medical Supply App.

For sign in, mock the form so any password can be used and login will work.

---

## 1. Sign-In Page

### Purpose
Allow **Primary Health Care Workers** to securely authenticate and access the medical supply request portal based on their assigned region and community.

### Parameters / Fields
| Field | Type | Validation | Notes |
|--------|------|-------------|-------|
| **Region** | Dropdown | Required | Populated from a static list or API (e.g., NT, QLD, WA, NSW, etc.) |
| **Community** | Dropdown | Required | Dynamically filtered based on selected Region |
| **Username** | Text (string) | Required | Unique user identifier (email or ID) |
| **Password** | Password (string) | Required | Minimum 8 characters, masked input |

### UI Requirements
- Display project logo and title: *"Indigenous Health Medical Supply Portal"*
- Two-column layout (branding or image on left, form on right)
- “Sign In” button (primary color, disabled until all fields are valid)
- Optional “Forgot Password?” link
- Responsive for desktop, tablet, and mobile

### Behavior / Logic
1. User selects **Region** → available **Communities** update dynamically.
2. Validate all input fields before enabling “Sign In” button.
3. On **Sign In**, verify credentials (mock JSON or API call).
4. Store user details (region, community, username) in local/session storage.
5. Redirect user to the **Medical Supply Request Form** page.
6. Show error message if login fails (e.g., *"Invalid credentials"*).

### Example Data Structure
```json
{
  "region": "Northern Territory",
  "community": "Tiwi Islands",
  "username": "healthworker01",
  "password": "********"
}
```

---

## 2. Medical Supply Request Form

### Purpose
Enable healthcare workers to browse medical supply categories, select items, specify quantities, and submit requests for their community.

### Parameters / Fields
| Field | Type | Validation | Notes |
|--------|------|-------------|-------|
| **Category of Medical Supply** | Dropdown | Required | e.g., Diabetes, Mental Health, Hypertension |
| **Item** | Dropdown / Searchable List | Required | Filtered by selected Category |
| **Quantity** | Number | Required, min 1 | Number of units required |
| **Add to Cart** | Button | - | Adds selected item to request cart |
| **Cart Summary** | Table/List | Auto-updated | Displays added items with edit/remove options |

### UI Requirements
- Clear step-by-step flow (Category → Item → Quantity → Add)
- “View Cart” section visible or in a modal popup
- “Submit Request” button (disabled until cart is not empty)
- Confirmation dialog on successful submission
- Error handling for empty or invalid input

### Behavior / Logic
1. Select **Category** → filter available **Items**.
2. Enter **Quantity** → click **Add to Cart**.
3. Display items in cart with options to edit or delete.
4. Validate non-empty cart on submission.
5. On **Submit Request**, generate JSON payload and send to backend (or mock API).
6. Clear cart and display success message after submission.

### Example Request Payload
```json
{
  "region": "Northern Territory",
  "community": "Tiwi Islands",
  "requested_by": "healthworker01",
  "supplies": [
    {
      "category": "Diabetes",
      "item": "Blood Glucose Strips",
      "quantity": 25
    },
    {
      "category": "First Aid",
      "item": "Antiseptic Wipes",
      "quantity": 100
    }
  ]
}
```

