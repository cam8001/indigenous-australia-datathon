import React, { useState } from 'react';
import { supplyCategories } from '../data/healthSupplies';
import type { CartItem } from '../data/healthSupplies';
import type { User } from '../data/authData';

interface HealthSupplyFormProps {
  user: User;
  onSignOut: () => void;
}

const HealthSupplyForm: React.FC<HealthSupplyFormProps> = ({ user, onSignOut }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const selectedCategoryData = supplyCategories.find(c => c.id === selectedCategory);
  const availableItems = selectedCategoryData?.supplies || [];

  const handleAddToCart = () => {
    if (!selectedCategory || !selectedItem || quantity < 1) return;

    const supply = availableItems.find(item => item.id === selectedItem);
    if (!supply) return;

    const existingItemIndex = cart.findIndex(item => item.supply.id === supply.id);
    
    if (existingItemIndex >= 0) {
      // Update existing item quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      // Add new item to cart
      setCart([...cart, { supply, quantity }]);
    }

    // Reset form
    setSelectedCategory('');
    setSelectedItem('');
    setQuantity(1);
  };

  const handleRemoveFromCart = (supplyId: string) => {
    setCart(cart.filter(item => item.supply.id !== supplyId));
  };

  const handleUpdateQuantity = (supplyId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      item.supply.id === supplyId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const handleSubmitRequest = () => {
    if (cart.length === 0) return;

    const requestPayload = {
      region: user.region,
      community: user.community,
      requested_by: user.username,
      supplies: cart.map(item => ({
        category: item.supply.category,
        item: item.supply.name,
        quantity: item.quantity
      }))
    };

    console.log('Submitting request:', requestPayload);
    
    // Clear cart and show success
    setCart([]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const isAddDisabled = !selectedCategory || !selectedItem || quantity < 1;

  return (
    <div className="supply-form-container">
      <div className="supply-header">
        <div>
          <h1>Health Supply Request</h1>
          <p>Welcome, {user.username} - {user.community}, {user.region}</p>
        </div>
        <button onClick={onSignOut} className="signout-btn">Sign Out</button>
      </div>

      <div className="supply-form">
        <div className="form-section">
          <h3>Add Health Supplies</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category of Health Supply</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedItem(''); // Reset item when category changes
                }}
              >
                <option value="">Select Category</option>
                {supplyCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="item">Item</label>
              <select
                id="item"
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                disabled={!selectedCategory}
              >
                <option value="">Select Item</option>
                {availableItems.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                min="1"
              />
            </div>

            <div className="form-group">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAddDisabled}
                className="add-btn"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="cart-section">
          <h3>Request Cart ({cart.length} items)</h3>
          
          {cart.length === 0 ? (
            <p className="empty-cart">No items in cart</p>
          ) : (
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.supply.id} className="cart-item">
                  <div className="item-info">
                    <strong>{item.supply.name}</strong>
                    <span className="item-category">{selectedCategoryData?.name}</span>
                  </div>
                  <div className="item-controls">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.supply.id, parseInt(e.target.value) || 1)}
                      min="1"
                      className="quantity-input"
                    />
                    <button
                      onClick={() => handleRemoveFromCart(item.supply.id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleSubmitRequest}
            disabled={cart.length === 0}
            className="submit-btn"
          >
            Submit Request
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="success-notification">
          <p>✅ Request submitted successfully!</p>
        </div>
      )}
    </div>
  );
};

export default HealthSupplyForm;
