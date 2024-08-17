"use client";

export default function FormControls({ controls, formData, setFormData }) {
  return controls.map((controlItem, index) => (
    <div className="mb-4" key={index}>
      <label
        className="block text-sm font-medium text-gray-700"
        htmlFor={controlItem.name}
      >
        {controlItem.label}
      </label>
      {/* {controlItem.type === 'text'? <input type="text" id={controlItem.name} name={controlItem.name} value={formData[controlItem.name]} onChange={e => setFormData({...formData, [controlItem.name]: e.target.value})} className="block w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-500 border border-gray-300 rounded-md dark:text-gray-200 dark:border-gray-600 dark:placeholder-gray-400" /> : controlItem.type === 'textarea'? <textarea id={controlItem.name} name={controlItem.name} value */}
      <input
        placeholder={controlItem.placeholder}
        type={controlItem.type}
        id={controlItem.name}
        name={controlItem.name}
        value={formData[controlItem.name]}
        onChange={(e) =>
          setFormData({ ...formData, [controlItem.name]: e.target.value })
        }
        className="shadow border rounded w-full py-2 px-3 text-gray-700 tracking-wide focus:outline-none focus:shadow-outline"
      />
    </div>
  ));
}
