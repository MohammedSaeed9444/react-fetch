import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const Tabl = () => {
  const [products, setProducts] = useState([]);
  const [editedTitle, setEditedTitle] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (productID) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${productID}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.isDeleted === true) {
        alert("Delete Successful!");
        
        // Remove the deleted product from the products array
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productID)
        );
      } else {
        alert("Delete Failed");
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert("Delete Failed - Check console for details");
    }
  };


  const addProduct = async (productID) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'BMW Pencil',
        })
      });
  
      const data = await response.json();
  
      if (data) {
        alert("Add Successful!");
  
        // Remove the deleted product from the products array
        setProducts((prevProducts) =>
          prevProducts.push((product) => product.id !== productID)
        );
      } else {
        alert("Add Failed");
      }
    } catch (error) {
      console.error('Error add product:', error);
      alert("add Failed - Check console for details");
    }
  };


  const updateProduct = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/1', {
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'iPhone Galaxy +1'
        })
      });
  
      const data = await response.json();
      console.log(data);
      alert("Edite is work!");
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <button onClick={() => addProduct(record.age)}>Add</button>
          <button onClick={() => updateProduct(record.age)}>Edit</button>
          <button onClick={() => deleteProduct(record.age)}>Delete</button>
        </Space>
      ),
    },
  ];

  const data = products.map((el, i) => ({
    key: i.toString(),
    age: el.id,
    name: el.title,
    address: el.price + "$",
    tags: ['Tag1', 'Tag2'], // You might need to adjust this based on your data
  }));

  return <Table columns={columns} dataSource={data} />;
};

export default Tabl;
