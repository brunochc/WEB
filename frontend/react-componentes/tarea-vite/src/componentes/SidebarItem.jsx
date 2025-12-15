function SidebarItem({ img, children }) {
  return (
    <div>
      <img src={img} alt="" />
      <p>{children}</p>
    </div>
  )
}

export default SidebarItem
